export const dynamic = "force-dynamic";

import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import {
  DollarSignIcon,
  LayoutDashboardIcon,
  PackageIcon,
  ShoppingCartIcon,
  ArrowRightIcon,
} from "lucide-react";
import { computeProductTotalPrice } from "@/helpers/product";
import Link from "next/link";
import { getOrderStatus } from "@/app/(shop)/orders/helpers/status";

const AdminDashboardPage = async () => {
  // 1. Busca todos os pedidos para calcular a receita e mostrar os recentes
  const orders = await prismaClient.order.findMany({
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // 2. Busca o total de produtos cadastrados no banco
  const totalProducts = await prismaClient.product.count();

  // 3. Calcula a receita total exata (aplicando os descontos da loja)
  const totalRevenue = orders.reduce((acc, order) => {
    // Se você tiver status de pagamento, poderia filtrar aqui (ex: apenas pedidos "PAID")
    const orderTotal = order.orderProducts.reduce((orderAcc, orderProduct) => {
      const productWithTotalPrice = computeProductTotalPrice(
        orderProduct.product as any,
      );
      return orderAcc + productWithTotalPrice * orderProduct.quantity;
    }, 0);

    return acc + orderTotal;
  }, 0);

  // Pega apenas os 5 últimos pedidos para a tabela de recentes
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="flex w-full flex-col gap-10 p-10">
      <Badge variant="heading" className="w-fit">
        <LayoutDashboardIcon size={18} />
        Dashboard
      </Badge>

      {/* 👇 GRID DE MÉTRICAS (Cards superiores) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Card de Receita */}
        <div className="flex flex-col gap-2 rounded-xl border border-zinc-800 bg-[#0A0A0A] p-6 shadow-lg">
          <div className="flex items-center gap-2 text-emerald-400">
            <DollarSignIcon size={20} />
            <h3 className="font-semibold uppercase tracking-wider">
              Receita Total
            </h3>
          </div>
          <p className="text-3xl font-bold text-white">
            R$ {totalRevenue.toFixed(2).replace(".", ",")}
          </p>
          <p className="text-sm text-zinc-500">
            Valor bruto de todas as vendas
          </p>
        </div>

        {/* Card de Vendas */}
        <div className="flex flex-col gap-2 rounded-xl border border-zinc-800 bg-[#0A0A0A] p-6 shadow-lg">
          <div className="flex items-center gap-2 text-[#8162FF]">
            <ShoppingCartIcon size={20} />
            <h3 className="font-semibold uppercase tracking-wider">
              Pedidos Realizados
            </h3>
          </div>
          <p className="text-3xl font-bold text-white">{orders.length}</p>
          <p className="text-sm text-zinc-500">Total de transações geradas</p>
        </div>

        {/* Card de Produtos */}
        <div className="flex flex-col gap-2 rounded-xl border border-zinc-800 bg-[#0A0A0A] p-6 shadow-lg">
          <div className="flex items-center gap-2  text-[#8162FF]">
            <PackageIcon size={20} />
            <h3 className="font-semibold uppercase tracking-wider">
              Produtos Ativos
            </h3>
          </div>
          <p className="text-3xl font-bold text-white">{totalProducts}</p>
          <p className="text-sm text-zinc-500">Cadastrados no catálogo</p>
        </div>
      </div>

      {/* 👇 TABELA DE PEDIDOS RECENTES */}
      <div className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-[#0A0A0A] p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Últimos Pedidos</h2>
          <Link
            href="/orders" // Ajuste para a rota onde fica a lista completa do admin
            className="flex items-center gap-1 text-sm font-semibold text-[#8162FF] hover:underline"
          >
            Ver todos <ArrowRightIcon size={16} />
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="border-b border-zinc-800 text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-medium">Nº Pedido</th>
                <th className="px-4 py-3 font-medium">Data</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Itens</th>
                <th className="px-4 py-3 text-right font-medium">
                  Valor Total
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => {
                  const orderTotal = order.orderProducts.reduce(
                    (acc, orderProduct) => {
                      const productWithTotalPrice = computeProductTotalPrice(
                        orderProduct.product as any,
                      );
                      return (
                        acc + productWithTotalPrice * orderProduct.quantity
                      );
                    },
                    0,
                  );

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-zinc-800/50 hover:bg-zinc-900/50"
                    >
                      <td className="px-4 py-4 font-bold text-zinc-200">
                        #{order.orderNumber || "S/N"}
                      </td>
                      <td className="px-4 py-4">
                        {new Intl.DateTimeFormat("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(order.createdAt)}
                      </td>
                      <td className="px-4 py-4 font-semibold text-[#8162FF]">
                        {getOrderStatus(order.status)}
                      </td>
                      <td className="px-4 py-4">
                        {order.orderProducts.reduce(
                          (acc, curr) => acc + curr.quantity,
                          0,
                        )}{" "}
                        unid.
                      </td>
                      <td className="px-4 py-4 text-right font-bold text-white">
                        R$ {orderTotal.toFixed(2).replace(".", ",")}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-zinc-500">
                    Nenhum pedido realizado ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
