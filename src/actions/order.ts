"use server";

import { prismaClient } from "@/lib/prisma";
import {
  processAsaasPayment,
  CreditCardInfo,
  getAsaasPaymentStatus,
} from "@/lib/asaas";

export interface OrderProductPayload {
  id: string;
  basePrice: number;
  discountPercentage: number;
  quantity: number;
}

export interface ShippingAddress {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export const createOrder = async (
  cartProducts: OrderProductPayload[],
  userId: string,
  paymentMethod: "PIX" | "CREDIT_CARD" | "BOLETO", // 👇 Boleto incluído
  customerCpf: string,
  creditCard?: CreditCardInfo,
  shippingAddress?: ShippingAddress,
  installmentCount?: number, // 👇 Parcelas incluídas
) => {
  const user = await prismaClient.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("Usuário não encontrado.");

  const totalValue = cartProducts.reduce((acc, product) => {
    const discount = product.basePrice * (product.discountPercentage / 100);
    const finalPrice = product.basePrice - discount;
    return acc + finalPrice * product.quantity;
  }, 0);

  const generatedOrderNumber = `${Math.floor(1000 + Math.random() * 9000)}`;

  const order = await prismaClient.order.create({
    data: {
      userId,
      status: "WAITING_FOR_PAYMENT",
      orderNumber: generatedOrderNumber,
      address: shippingAddress?.address,
      city: shippingAddress?.city,
      state: shippingAddress?.state,
      zipCode: shippingAddress?.zipCode,
      orderProducts: {
        createMany: {
          data: cartProducts.map((product) => ({
            basePrice: product.basePrice,
            discountPercentage: product.discountPercentage,
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    },
  });

  const paymentResult = await processAsaasPayment(
    order.id,
    totalValue,
    paymentMethod,
    {
      name: user.name || "Cliente PurpleTech",
      email: user.email || "cliente@purpletech.com",
      cpfCnpj: customerCpf,
    },
    creditCard,
    shippingAddress,
    installmentCount,
  );

  if (
    paymentMethod === "CREDIT_CARD" &&
    (paymentResult.status === "CONFIRMED" ||
      paymentResult.status === "RECEIVED")
  ) {
    await prismaClient.order.update({
      where: { id: order.id },
      data: { status: "PAYMENT_CONFIRMED" },
    });
  }

  return {
    orderId: order.id,
    paymentId: paymentResult.paymentId,
    paymentMethod,
    pixQrCodeBase64: paymentResult.qrCodeBase64,
    pixCopyAndPaste: paymentResult.copyAndPaste,
    bankSlipUrl: paymentResult.bankSlipUrl, // Envia para o form
  };
};

export const checkPixPayment = async (paymentId: string, orderId: string) => {
  const status = await getAsaasPaymentStatus(paymentId);
  const isPaid = status === "RECEIVED" || status === "CONFIRMED";

  if (isPaid) {
    await prismaClient.order.update({
      where: { id: orderId },
      data: { status: "PAYMENT_CONFIRMED" },
    });
  }

  return isPaid;
};

export const cancelOrder = async (orderId: string) => {
  try {
    await prismaClient.orderProduct.deleteMany({ where: { orderId } });
    await prismaClient.order.delete({ where: { id: orderId } });
  } catch (error) {
    console.error("Erro ao cancelar pedido no banco:", error);
  }
};
