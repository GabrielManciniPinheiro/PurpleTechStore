import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import PromoBanner from "./components/promo-banner";
import Link from "next/link";
import ProductCarousel from "@/components/ui/product-carousel";
import { computeProductTotalPrice } from "@/helpers/product";

export const revalidate = 0;

export default async function Home() {
  // 👇 1. Ofertas filtrando apenas os ativos
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
      isActive: true,
    },
  });

  // 👇 2. Teclados filtrando apenas os ativos
  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
      isActive: true,
    },
  });

  // 👇 3. Mouses filtrando apenas os ativos
  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
      isActive: true,
    },
  });

  const dealsWithTotalPrice = deals.map((product) => ({
    ...product,
    totalPrice: computeProductTotalPrice(product as any),
  }));

  const keyboardsWithTotalPrice = keyboards.map((product) => ({
    ...product,
    totalPrice: computeProductTotalPrice(product as any),
  }));

  const mousesWithTotalPrice = mouses.map((product) => ({
    ...product,
    totalPrice: computeProductTotalPrice(product as any),
  }));

  return (
    <>
      <div className="mx-auto max-w-[1920px]">
        <Link href="/deals">
          <PromoBanner
            src="/deals-banner.png"
            className="hidden h-auto w-full lg:block"
            alt="Até 55% de desconto esse mês!"
          />
        </Link>
      </div>

      <div className="mx-auto flex flex-col gap-8 py-8 lg:container lg:gap-10">
        <Link href="/deals">
          <PromoBanner
            src="/banner-home-01.png"
            alt="Até 55% de desconto esse mês!"
            className="px-5 lg:hidden"
          />
        </Link>

        <div className="px-5 lg:mt-2">
          <Categories />
        </div>

        {/* CARROSSEL 1: OFERTAS */}
        <div className="flex flex-col gap-3 lg:gap-5">
          <ProductCarousel title="Ofertas" products={dealsWithTotalPrice} />
        </div>

        <div className="flex flex-col lg:flex-row">
          <Link href="/category/mouses" className="flex flex-1">
            <PromoBanner
              src="/banner-home-02.png"
              alt="Até 55% de desconto em mouses!"
              className="w-0 flex-1 px-5"
            />
          </Link>

          <Link href="/category/headphones" className="flex flex-1">
            <PromoBanner
              src="/banner-home-03.png"
              alt="Até 55% de desconto em fones!"
              className="hidden w-0 flex-1 lg:block"
            />
          </Link>
        </div>

        {/* CARROSSEL 2: TECLADOS */}
        <div className="flex flex-col gap-3 lg:gap-5">
          <ProductCarousel
            title="Teclados"
            products={keyboardsWithTotalPrice}
          />
        </div>

        <div>
          <Link href="/category/headphones">
            <PromoBanner
              src="/banner-home-03.png"
              alt="Até 55% de desconto em mouses!"
              className="px-5 lg:hidden"
            />
          </Link>

          <Link href="/catalog">
            <PromoBanner
              src="/free-shipping-banner.png"
              alt="Até 55% de desconto em mouses!"
              className="hidden px-5 lg:block"
            />
          </Link>
        </div>

        {/* CARROSSEL 3: MOUSES */}
        <div className="flex flex-col gap-3 lg:gap-5">
          <ProductCarousel title="Mouses" products={mousesWithTotalPrice} />
        </div>
      </div>
    </>
  );
}
