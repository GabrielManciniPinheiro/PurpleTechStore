"use server";

import { prismaClient } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createProduct = async (data: {
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  categoryId: string;
  discountPercentage: number;
  imageUrls: string[];
  supplierUrl?: string;
  costPrice?: number;
}) => {
  await prismaClient.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      basePrice: data.basePrice,
      categoryId: data.categoryId,
      discountPercentage: data.discountPercentage,
      imageUrls: data.imageUrls,
      supplierUrl: data.supplierUrl || null,
      costPrice: data.costPrice || null,
    },
  });

  revalidatePath("/dashboard/products");
  revalidatePath("/"); // Atualiza a vitrine da loja também!
};
