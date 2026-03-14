import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { ListOrderedIcon } from "lucide-react";
import CategoriesTable from "./components/categories-table";
import CreateCategoryDialog from "./components/create-category-dialog";

const CategoriesPage = async () => {
  const categories = await prismaClient.category.findMany({
    include: {
      products: {
        select: {
          id: true,
        },
      },
    },
  });

  return (
    <div className="flex w-full flex-col gap-10 p-10">
      <Badge variant="heading">
        <ListOrderedIcon size={18} />
        Categorias
      </Badge>

      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-bold">
          Categorias encontradas: {categories.length}
        </p>

        {/* 👇 Substituímos o <Button> estático pelo nosso Modal Interativo 👇 */}
        <CreateCategoryDialog />
      </div>

      <CategoriesTable categories={categories} />
    </div>
  );
};

export default CategoriesPage;
