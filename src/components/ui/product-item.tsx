import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import Link from "next/link";
import DiscountBadge from "./discount-badge";
import { cn } from "@/lib/utils";

interface ProductItemProps {
  product: ProductWithTotalPrice;
  className?: string;
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn("flex min-w-[156px] flex-col gap-4", className)}
    >
      {/* 👇 Adicionamos overflow-hidden para blindar a caixa */}
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-accent">
        {/* 👇 O segredo: usamos 'fill' para a imagem obedecer a caixa, e 'p-5' para dar aquele respiro nas bordas */}
        <Image
          src={product.imageUrls[0]}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-5"
          alt={product.name}
        />

        {product.discountPercentage > 0 && (
          <DiscountBadge className="absolute left-3 top-3">
            {product.discountPercentage}
          </DiscountBadge>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="truncate text-sm">{product.name}</p>

        <div className="flex items-center gap-2 ">
          {product.discountPercentage > 0 ? (
            <>
              <p className="truncate font-semibold lg:text-lg">
                R$ {Number(product.totalPrice).toFixed(2)}
              </p>

              <p className="truncate text-xs line-through opacity-75 lg:text-sm">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            </>
          ) : (
            <p className="truncate text-sm font-semibold">
              R$ {Number(product.basePrice).toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
