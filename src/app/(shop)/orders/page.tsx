import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { PackageSearchIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "../../../components/ui/order-item";

export const dynamic = "force-dynamic";

async function OrderPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-5">
        <h2 className="font-bold">Acesso Negado!</h2>
        <p className="text-sm opacity-60">Faça login para ver seus pedidos</p>
      </div>
    );
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: session.user.id,
    },
    // 👇 A MÁGICA ACONTECE AQUI: Ordenando do mais novo para o mais antigo
    orderBy: {
      createdAt: "desc",
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="p-5 lg:container lg:mx-auto lg:py-10">
      <Badge variant="heading">
        <PackageSearchIcon size={16} />
        Meus Pedidos
      </Badge>

      <div className="mt-5 flex flex-col gap-5">
        {orders.length > 0 ? (
          orders.map((order) => <OrderItem key={order.id} order={order} />)
        ) : (
          // 👇 Aproveitei para adicionar um feedback caso ele não tenha pedidos
          <div className="mt-10 flex flex-col items-center justify-center gap-2">
            <h3 className="text-lg font-bold text-zinc-100">
              Nenhum pedido encontrado.
            </h3>
            <p className="text-sm text-zinc-400">
              Você ainda não realizou nenhuma compra na loja.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderPage;
