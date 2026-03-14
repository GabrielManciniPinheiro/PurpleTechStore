import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { PackageIcon } from "lucide-react";
import ProductsTable, {
  ProductWithTotalPriceAndCategory,
} from "./components/products-table";
import { computeProductTotalPrice } from "@/helpers/product";
import CreateProductDialog from "./components/create-product-dialog";

const ProductsPage = async () => {
  // 1. Busca os produtos como você já fazia
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

  return (
    <div className="flex w-full flex-col gap-10 p-10">
      <Badge variant="heading">
        <PackageIcon size={18} />
        Produtos
      </Badge>

      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-bold">
          Produtos encontrados: {products.length}
        </p>

        {/* 👇 O seu Modal super turbinado entra aqui! 👇 */}
        <CreateProductDialog categories={categories} />
      </div>

      <ProductsTable products={productsWithTotalPrice} />
    </div>
  );
};

export default ProductsPage;
