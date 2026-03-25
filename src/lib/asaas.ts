const API_URL = process.env.ASAAS_API_URL as string;
const API_KEY = process.env.ASAAS_API_KEY as string;

export interface CreditCardInfo {
  holderName: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  ccv: string;
}

export interface PaymentResult {
  paymentId: string;
  qrCodeBase64?: string;
  copyAndPaste?: string;
  status?: string;
}

export const processAsaasPayment = async (
  orderId: string,
  totalValue: number,
  billingType: "PIX" | "CREDIT_CARD",
  customerData: { name: string; email: string; cpfCnpj: string },
  creditCard?: CreditCardInfo,
  shippingAddress?: { zipCode: string; address: string },
): Promise<PaymentResult> => {
  const headers = {
    access_token: API_KEY,
    "Content-Type": "application/json",
  };

  const customerResponse = await fetch(`${API_URL}/customers`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: customerData.name,
      email: customerData.email,
      cpfCnpj: customerData.cpfCnpj,
    }),
  });

  const customer = await customerResponse.json();

  if (!customerResponse.ok) throw new Error("Erro ao criar cliente no Asaas");

  const paymentPayload: Record<string, unknown> = {
    customer: customer.id,
    billingType: billingType,
    value: totalValue,
    dueDate: new Date().toISOString().split("T")[0],
    description: `Pedido ${orderId} - PurpleTech Store`,
    externalReference: orderId,
  };

  if (billingType === "CREDIT_CARD" && creditCard) {
    paymentPayload.creditCard = creditCard;
    paymentPayload.creditCardHolderInfo = {
      name: customerData.name,
      email: customerData.email,
      cpfCnpj: customerData.cpfCnpj,
      postalCode: shippingAddress?.zipCode.replace(/\D/g, "") || "01310100",
      addressNumber: "SN",
      phone: "11999999999",
    };
  }

  const paymentResponse = await fetch(`${API_URL}/payments`, {
    method: "POST",
    headers,
    body: JSON.stringify(paymentPayload),
  });

  const payment = await paymentResponse.json();

  if (!paymentResponse.ok) throw new Error("Erro ao gerar cobrança no Asaas");

  if (billingType === "PIX") {
    const qrCodeResponse = await fetch(
      `${API_URL}/payments/${payment.id}/pixQrCode`,
      { method: "GET", headers },
    );

    const qrCodeData = await qrCodeResponse.json();

    return {
      paymentId: payment.id,
      qrCodeBase64: qrCodeData.encodedImage,
      copyAndPaste: qrCodeData.payload,
    };
  }

  return {
    paymentId: payment.id,
    status: payment.status,
  };
};

export const getAsaasPaymentStatus = async (
  paymentId: string,
): Promise<string> => {
  const response = await fetch(`${API_URL}/payments/${paymentId}`, {
    method: "GET",
    headers: { access_token: API_KEY },
    cache: "no-store",
  });

  const data = await response.json();
  return data.status;
};
