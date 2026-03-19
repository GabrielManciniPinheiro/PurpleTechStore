import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseProductQuantityClick = () => {
    decreaseProductQuantity(product.id);
  };

  const handleIncreaseProductQuantityClick = () => {
    increaseProductQuantity(product.id);
  };

  const handleRemoveProductClick = () => {
    removeProductFromCart(product.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* 👇 O SEGREDO 1: relative, shrink-0 (anti-esmagamento) e overflow-hidden */}
        <div className="relative flex h-[77px] w-[77px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-accent lg:h-[120px] lg:w-[120px]">
          {/* 👇 O SEGREDO 2: 'fill' e 'object-contain' com padding igual na vitrine */}
          <Image
            src={product.imageUrls[0]}
            fill
            sizes="(max-width: 768px) 77px, 120px"
            alt={product.name}
            className="object-contain p-2 lg:p-3"
          />
        </div>

        <div className="flex flex-col gap-1 lg:gap-2">
          <p className="text-xs lg:text-sm">{product.name}</p>

          <div className="flex items-center gap-2">
            <p className="text-sm font-bold lg:text-base">
              R$ {product.totalPrice.toFixed(2)}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75 lg:text-sm">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 lg:gap-3">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 lg:h-9 lg:w-9"
              onClick={handleDecreaseProductQuantityClick}
            >
              <ArrowLeftIcon className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>

            <span className="text-xs lg:text-sm">{product.quantity}</span>

            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 lg:h-9 lg:w-9"
              onClick={handleIncreaseProductQuantityClick}
            >
              <ArrowRightIcon className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        variant="outline"
        onClick={handleRemoveProductClick}
        className="h-8 w-8 lg:h-9 lg:w-9"
      >
        <TrashIcon className="h-4 w-4 lg:h-5 lg:w-5" />
      </Button>
    </div>
  );
};

export default CartItem;
