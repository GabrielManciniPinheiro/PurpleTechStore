import { Product } from "@prisma/client";
export interface ProductWithTotalPrice extends Product {
  totalPrice: number;
}

export const computeProductTotalPrice = (
  product: Pick<Product, "discountPercentage"> & { basePrice: any },
): number => {
  // Converte o Decimal do Prisma para número real de forma segura
  const basePrice =
    typeof product.basePrice === "object"
      ? Number(product.basePrice.toString())
      : Number(product.basePrice);

  if (product.discountPercentage === 0) {
    return basePrice;
  }

  const totalDiscount = basePrice * (product.discountPercentage / 100);
  return basePrice - totalDiscount;
};
