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
    // Usando 'any' para o TypeScript não encher o saco com o shipping_details
    const session = event.data.object as any;

    // 📦 Capturando os dados de entrega nativos do Stripe
    const shippingDetails = session.shipping_details?.address;

    // Montando a rua + número + complemento (se houver)
    const fullAddress = shippingDetails?.line1
      ? `${shippingDetails.line1}${
          shippingDetails.line2 ? ` - ${shippingDetails.line2}` : ""
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
        city: shippingDetails?.city,
        state: shippingDetails?.state,
        zipCode: shippingDetails?.postal_code,
      },
    });
  }

  return NextResponse.json({ received: true });
};
