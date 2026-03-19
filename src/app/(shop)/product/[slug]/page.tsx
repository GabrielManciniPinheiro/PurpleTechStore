import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/product-images";
import ProductInfo from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";
import SectionTitle from "@/components/ui/section-title";

// 👇 IMPORTANTE: Trocamos o import do ProductList pelo seu ProductCarousel
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

  console.log(product);

  if (!product) return null;

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

      {product.category && (
        <div className="flex flex-col gap-5">
          <ProductCarousel
            title="Produtos Recomendados"
            products={product.category.products as any}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
