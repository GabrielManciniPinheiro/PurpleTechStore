"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  total: number;
  subtotal: number;
  totalDiscount: number;
  addProductToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  total: 0,
  subtotal: 0,
  totalDiscount: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  // 👇 1. "Congelando" a função de limpar o carrinho para evitar loops
  const clearCart = useCallback(() => {
    setProducts([]);
  }, []);

  // 👇 2. "Congelando" as outras funções principais
  const addProductToCart = useCallback((product: CartProduct) => {
    setProducts((prev) => {
      const productIsAlreadyOnCart = prev.some((p) => p.id === product.id);
      if (productIsAlreadyOnCart) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + product.quantity }
            : p,
        );
      }
      return [...prev, product];
    });
  }, []);

  const decreaseProductQuantity = useCallback((productId: string) => {
    setProducts((prev) =>
      prev
        .map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p,
        )
        .filter((p) => p.quantity > 0),
    );
  }, []);

  const increaseProductQuantity = useCallback((productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p,
      ),
    );
  }, []);

  const removeProductFromCart = useCallback((productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const subtotal = useMemo(() => {
    return products.reduce(
      (acc, product) => acc + Number(product.basePrice) * product.quantity,
      0,
    );
  }, [products]);

  const total = useMemo(() => {
    return products.reduce(
      (acc, product) => acc + product.totalPrice * product.quantity,
      0,
    );
  }, [products]);

  const totalDiscount = subtotal - total;

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        clearCart,
        total,
        subtotal,
        totalDiscount,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
