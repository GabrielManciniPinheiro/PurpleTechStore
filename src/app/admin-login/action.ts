"use server";

import { prismaClient } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const admin = await prismaClient.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    return { error: "Credenciais inválidas" };
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (!passwordMatch) {
    return { error: "Credenciais inválidas" };
  }

  // 1. Grava o Cookie de Sessão
  cookies().set("gmp_admin_session", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 dia
    path: "/",
  });

  // 2. Retorna sucesso para o cliente navegar
  return { success: true };
}
