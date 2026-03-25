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
  bankSlipUrl?: string; // 👇 Adicionado para retornar o link do Boleto
  status?: string;
}

export const processAsaasPayment = async (
  orderId: string,
  totalValue: number,
  billingType: "PIX" | "CREDIT_CARD" | "BOLETO", // 👇 Boleto incluído
  customerData: { name: string; email: string; cpfCnpj: string },
  creditCard?: CreditCardInfo,
  shippingAddress?: { zipCode: string; address: string },
  installmentCount?: number, // 👇 Adicionado para receber as parcelas
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

  if (!customerResponse.ok) {
    console.error("🔴 ERRO DETALHADO DO ASAAS (Cliente):", customer);
    throw new Error("Erro ao criar cliente no Asaas");
  }

  // 👇 Configura o vencimento: Boleto ganha 3 dias, Pix/Cartão vencem hoje
  const dueDate = new Date();
  if (billingType === "BOLETO") {
    dueDate.setDate(dueDate.getDate() + 3);
  }

  const paymentPayload: Record<string, unknown> = {
    customer: customer.id,
    billingType: billingType,
    value: totalValue,
    dueDate: dueDate.toISOString().split("T")[0],
    description: `Pedido ${orderId} - PurpleTech Store`,
    externalReference: orderId,
  };

  // 👇 Lógica do Cartão de Crédito COM PARCELAMENTO
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

    // Se o cliente escolheu parcelar, o Asaas exige a quantidade e o valor exato da parcela
    if (installmentCount && installmentCount > 1) {
      paymentPayload.installmentCount = installmentCount;
      paymentPayload.installmentValue = Number(
        (totalValue / installmentCount).toFixed(2),
      );
    }
  }

  const paymentResponse = await fetch(`${API_URL}/payments`, {
    method: "POST",
    headers,
    body: JSON.stringify(paymentPayload),
  });

  const payment = await paymentResponse.json();

  if (!paymentResponse.ok) {
    console.error("🔴 ERRO DETALHADO DO ASAAS (Pagamento):", payment);
    throw new Error("Erro ao gerar cobrança no Asaas");
  }

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

  // 👇 Retorna a URL do Boleto se esse for o método escolhido
  if (billingType === "BOLETO") {
    return {
      paymentId: payment.id,
      bankSlipUrl: payment.bankSlipUrl,
      status: payment.status,
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
