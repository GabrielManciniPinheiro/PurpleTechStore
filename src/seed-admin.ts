import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("projeto_muitanota", 10);

  await prisma.admin.upsert({
    where: { email: "storepurpletech@gmail.com" },
    update: {},
    create: {
      email: "storepurpletech@gmail.com",
      password: hashedPassword,
    },
  });

  console.log("✅ Administrador criado com sucesso!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
