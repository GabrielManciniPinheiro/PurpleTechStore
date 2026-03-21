import { OrderStatus } from "@prisma/client";

export const getOrderStatus = (orderStatus: OrderStatus) => {
  return {
    [OrderStatus.WAITING_FOR_PAYMENT]: "Pendente",
    [OrderStatus.PAYMENT_CONFIRMED]: "Pago",
    [OrderStatus.SHIPPED]: "Enviado",
    [OrderStatus.DELIVERED]: "Entregue",
    [OrderStatus.CANCELED]: "Cancelado",
  }[orderStatus];
};
