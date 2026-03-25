import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface AsaasWebhookPayload {
  event: string;
  payment: {
    id: string;
    externalReference?: string;
    status: string;
  };
}

export const POST = async (request: Request) => {
  try {
    // 🛡️ O SEGURANÇA DA BALADA: Verifica se o token do Asaas é o mesmo da Vercel
    const asaasToken = request.headers.get("asaas-access-token");
    const mySecretToken = process.env.ASAAS_WEBHOOK_TOKEN;

    if (!mySecretToken || asaasToken !== mySecretToken) {
      console.error(
        "🔴 Bloqueado: Tentativa de acesso sem token válido no Webhook!",
      );
      return NextResponse.json({ error: "Acesso Negado" }, { status: 401 });
    }

    // 1. Recebe o payload do Asaas (agora sabemos que é seguro)
    const body = (await request.json()) as AsaasWebhookPayload;
    const { event, payment } = body;

    // 2. Se não vier o número do pedido (externalReference), a gente ignora
    if (!payment?.externalReference) {
      return NextResponse.json({ message: "Ignorado" }, { status: 200 });
    }

    const orderId = payment.externalReference;

    // 3. Atualiza o banco de dados se o dinheiro caiu
    if (event === "PAYMENT_RECEIVED" || event === "PAYMENT_CONFIRMED") {
      await prismaClient.order.update({
        where: { id: orderId },
        data: { status: "PAYMENT_CONFIRMED" },
      });
      console.log(`✅ Webhook Asaas: Pedido ${orderId} atualizado para PAGO!`);
    }

    // 4. Responde pro Asaas que deu tudo certo
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("🔴 Erro no Webhook Asaas:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
