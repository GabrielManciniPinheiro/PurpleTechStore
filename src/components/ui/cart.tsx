"use client";

// 👇 Adicionei o ArrowLeftIcon aqui para o botão de voltar
import { ShoppingCartIcon, ArrowLeftIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext, useState } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { useSession, signIn } from "next-auth/react";
import CheckoutForm from "./checkout-form";

const Cart = () => {
  const { data } = useSession();
  const { products, subtotal, total, totalDiscount } = useContext(CartContext);

  const [isCheckout, setIsCheckout] = useState(false);

  const handleFinishPurchaseClick = () => {
    if (!data?.user) {
      return signIn();
    }
    setIsCheckout(true);
  };

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge variant="heading">
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      {/* 📍 O PULO DO GATO: Só mostra a lista de produtos se NÃO estiver na tela de pagamento */}
      {!isCheckout && (
        <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="flex h-full flex-col gap-8">
              {products.length > 0 ? (
                products.map((product) => (
                  <CartItem
                    key={product.id}
                    product={{
                      ...product,
                      totalPrice: computeProductTotalPrice(product),
                    }}
                  />
                ))
              ) : (
                <p className="text-center font-semibold">
                  Você ainda não possui nenhum produto no carrinho.
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      )}

      {products.length > 0 && (
        <div
          // 👇 Se estiver no checkout, permitimos o scroll (overflow-y-auto) e fazemos ele preencher o espaço (flex-1)
          className={`flex flex-col gap-3 ${
            isCheckout ? "flex-1 overflow-y-auto pr-2" : ""
          }`}
        >
          <Separator />

          <div className="flex items-center justify-between text-xs lg:text-sm">
            <p>Subtotal</p>
            <p>R$ {subtotal.toFixed(2)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs lg:text-sm">
            <p>Entrega</p>
            <p>GRÁTIS</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs lg:text-sm">
            <p>Descontos</p>
            <p>- R$ {totalDiscount.toFixed(2)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm font-bold lg:text-base">
            <p>Total</p>
            <p>R$ {total.toFixed(2)}</p>
          </div>

          {isCheckout ? (
            <div className="mt-4 flex flex-col gap-4">
              {/* 👇 Botãozinho discreto para o usuário conseguir voltar e ver a lista de produtos se quiser */}
              <button
                onClick={() => setIsCheckout(false)}
                className="flex w-fit items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
              >
                <ArrowLeftIcon size={14} />
                Voltar para o carrinho
              </button>

              <CheckoutForm userId={(data?.user as any).id} />
            </div>
          ) : (
            <Button
              className="mt-7 font-bold uppercase hover:bg-[#6b4ce6]"
              onClick={handleFinishPurchaseClick}
            >
              Finalizar compra
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
