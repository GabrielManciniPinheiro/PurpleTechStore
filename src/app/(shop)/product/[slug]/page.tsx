import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/product-images";
import ProductInfo from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";
import SectionTitle from "@/components/ui/section-title";
import ProductCarousel from "@/components/ui/product-carousel";

export const revalidate = 0;

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailsPage = async ({
  params: { slug },
}: ProductDetailsPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
      isActive: true,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
              isActive: true,
            },
          },
        },
      },
      wishLists: true,
    },
  });

  if (!product) return null;

  // 👇 PROCESSAMENTO DA LISTA: Injetamos o totalPrice em cada produto recomendado
  const recommendedProducts = product.category?.products.map((p) => ({
    ...p,
    totalPrice: computeProductTotalPrice(p as any),
  }));

  return (
    <div className="flex flex-col gap-8 pb-8 lg:container lg:mx-auto lg:gap-10 lg:py-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-9 lg:px-5">
        <ProductImages imageUrls={product.imageUrls} name={product.name} />
        <ProductInfo
          product={{
            ...product,
            totalPrice: computeProductTotalPrice(product as any),
          }}
        />
      </div>

      {product.category && recommendedProducts && (
        <div className="flex flex-col gap-5">
          <ProductCarousel
            title="Produtos Recomendados"
            // Mandamos a lista processada e com os preços calculados para o carrossel
            products={recommendedProducts as any}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
