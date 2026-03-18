"use server";

import { prismaClient } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 🟢 CADASTRAR PRODUTO
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
  revalidatePath("/");
};

// 🔵 EDITAR PRODUTO
export const updateProduct = async (data: {
  id: string; // O ID é obrigatório para sabermos quem editar
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
  await prismaClient.product.update({
    where: { id: data.id },
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
  revalidatePath("/");
  revalidatePath("/catalog");
  revalidatePath("/deals");
};

// 🔴 APAGAR PRODUTO (Soft Delete)
export const deleteProduct = async (productId: string) => {
  await prismaClient.product.update({
    where: { id: productId },
    data: { isActive: false }, // 🔥 Inativa em vez de deletar de verdade!
  });

  revalidatePath("/dashboard/products");
  revalidatePath("/");
  revalidatePath("/catalog");
  revalidatePath("/deals");
};
