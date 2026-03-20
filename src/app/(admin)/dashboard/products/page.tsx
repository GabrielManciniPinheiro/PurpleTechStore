import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { PackageIcon } from "lucide-react";
import ProductsTable, {
  ProductWithTotalPriceAndCategory,
} from "./components/products-table";
import { computeProductTotalPrice } from "@/helpers/product";
import CreateProductDialog from "./components/create-product-dialog";

const ProductsPage = async () => {
  // 1. Busca os produtos
  const products = await prismaClient.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  // 2. Busca TODAS as categorias para preencher o Select do Modal
  const categories = await prismaClient.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const productsWithTotalPrice: ProductWithTotalPriceAndCategory[] =
    products.map((product) => ({
      ...product,
      totalPrice: computeProductTotalPrice(product as any),
    }));

  // 👇 A MÁGICA DO AGRUPAMENTO: Separando os produtos pelas suas categorias
  const groupedProducts = productsWithTotalPrice.reduce(
    (acc, product) => {
      const categoryName = product.category?.name || "Sem Categoria";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(product);
      return acc;
    },
    {} as Record<string, ProductWithTotalPriceAndCategory[]>,
  );

  return (
    <div className="flex h-full w-full flex-col gap-10 overflow-y-auto p-10 pb-24">
      <Badge variant="heading">
        <PackageIcon size={18} />
        Produtos
      </Badge>

      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-bold">
          Total de Produtos: {products.length}
        </p>

        <CreateProductDialog categories={categories} />
      </div>

      {/* 👇 Renderizando as categorias e suas respectivas tabelas! */}
      <div className="flex flex-col gap-12">
        {Object.entries(groupedProducts).map(
          ([categoryName, categoryProducts]) => (
            <div key={categoryName} className="flex flex-col gap-4">
              {/* Título da Categoria */}
              <h2 className="flex items-center gap-3 border-b border-zinc-800 pb-2 text-2xl font-bold text-white">
                {categoryName}
                <span className="text-sm font-normal text-zinc-500">
                  ({categoryProducts.length}{" "}
                  {categoryProducts.length === 1 ? "produto" : "produtos"})
                </span>
              </h2>

              {/* Tabela apenas com os produtos desta categoria */}
              <ProductsTable
                products={categoryProducts}
                categories={categories}
              />
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
