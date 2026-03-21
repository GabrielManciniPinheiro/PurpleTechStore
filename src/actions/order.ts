"use server";

import { prismaClient } from "@/lib/prisma";
import { CartProduct } from "@/providers/cart";

export const createOrder = async (
  cartProducts: CartProduct[],
  userId: string,
) => {
  // 👇 1. Criamos a variável que gera o código aleatório (Ex: PT-4829)
  const generatedOrderNumber = `PT-${Math.floor(1000 + Math.random() * 9000)}`;

  const order = await prismaClient.order.create({
    data: {
      userId,
      status: "WAITING_FOR_PAYMENT",
      orderNumber: generatedOrderNumber, // 👇 2. Injetamos o número obrigatório aqui!
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

  return order;
};
