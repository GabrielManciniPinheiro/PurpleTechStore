export const dynamic = "force-dynamic";

import { Badge } from "@/components/ui/badge";
import OrderItem from "@/components/ui/order-item";
import { prismaClient } from "@/lib/prisma";
import { PackageSearchIcon, MapPinIcon } from "lucide-react";

// Importando o nosso Client Component de busca dinâmica
import OrderSearch from "@/components/ui/order-search";

interface AdminOrdersPageProps {
  searchParams: {
    q?: string;
  };
}

const AdminOrdersPage = async ({ searchParams }: AdminOrdersPageProps) => {
  const searchQuery = searchParams.q;

  // Busca TODOS os pedidos da loja, filtrando pelo número se houver pesquisa
  const orders = await prismaClient.order.findMany({
    where: searchQuery
      ? {
          orderNumber: {
            contains: searchQuery,
          },
        }
      : undefined,
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc", // Mantendo os mais recentes no topo
    },
  });

  return (
    <div className="flex w-full flex-col gap-10 p-10">
      <Badge variant="heading" className="w-fit">
        <PackageSearchIcon size={18} />
        Meus Pedidos
      </Badge>

      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-lg font-bold">
          {searchQuery
            ? `Resultados para "#${searchQuery}" (${orders.length})`
            : `Total de Pedidos: ${orders.length}`}
        </p>

        {/* A barrinha de pesquisa dinâmica entra aqui */}
        <OrderSearch />
      </div>

      <div className="flex h-full flex-col gap-8 overflow-auto pb-10">
        {orders.length > 0 ? (
          orders.map((order) => (
            // Wrapper exclusivo do Admin para injetar o endereço
            <div
              key={order.id}
              className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-[#0A0A0A] p-5 shadow-lg"
            >
              {/* Bloco de Endereço */}
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-bold text-[#8162FF]">
                  <MapPinIcon size={18} />
                  <p className="text-base uppercase tracking-wider">
                    Dados de Entrega
                  </p>
                </div>
                <div className="ml-7 flex flex-col gap-1 text-zinc-400">
                  <p className="font-semibold text-zinc-200">
                    {order.address || "Endereço não informado no checkout"}
                  </p>
                  <p>
                    {order.city
                      ? `${order.city} - ${order.state}`
                      : "Cidade e Estado pendentes"}
                  </p>
                  <p>CEP: {order.zipCode || "Não registrado"}</p>
                </div>
              </div>

              {/* O componente de pedido padrão renderizado logo abaixo */}
              <OrderItem order={order} />
            </div>
          ))
        ) : (
          <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-800">
            <p className="text-zinc-500">
              Nenhum pedido encontrado no sistema.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
