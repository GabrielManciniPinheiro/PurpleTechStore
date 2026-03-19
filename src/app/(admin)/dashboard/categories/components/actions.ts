"use server";

revalidatePath("/dashboard/categories"); // Atualiza a tabela de categorias
revalidatePath("/dashboard/products"); // 👇 O SEGREDO: Atualiza o Select nos modais de Produto!
revalidatePath("/catalog");

import { prismaClient } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createCategory = async (data: {
  name: string;
  slug: string;
  imageUrl: string;
}) => {
  // 1. Guardar a nova categoria na base de dados
  await prismaClient.category.create({
    data: {
      name: data.name,
      slug: data.slug,
      imageUrl: data.imageUrl,
    },
  });

  // 2. Avisar o Next.js para atualizar a cache e mostrar a nova categoria no ecrã sem precisar de F5
  revalidatePath("/dashboard/categories");
};
