import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-02-25.clover",
});

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.error();
  }

  const text = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_KEY as string,
    );
  } catch (error) {
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    // Usando 'any' para o TypeScript não encher o saco
    const session = event.data.object as any;

    // 📦 Pega o endereço de Entrega. Se vier vazio, pega o de Cobrança.
    const addressData =
      session.shipping_details?.address || session.customer_details?.address;

    // Montando a rua + número + complemento (se houver)
    const fullAddress = addressData?.line1
      ? `${addressData.line1}${
          addressData.line2 ? ` - ${addressData.line2}` : ""
        }`
      : null;

    // ATUALIZAR PEDIDO COM STATUS E ENDEREÇO
    await prismaClient.order.update({
      where: {
        id: session.metadata.orderId,
      },
      data: {
        status: "PAYMENT_CONFIRMED",
        address: fullAddress,
        city: addressData?.city || null,
        state: addressData?.state || null,
        zipCode: addressData?.postal_code || null,
      },
    });
  }

  return NextResponse.json({ received: true });
};
