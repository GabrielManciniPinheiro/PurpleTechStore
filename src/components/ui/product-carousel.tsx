"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import ProductItem from "./product-item";
import { ProductWithTotalPrice } from "@/helpers/product";

interface ProductCarouselProps {
  title: string;
  products: ProductWithTotalPrice[];
}

const ProductCarousel = ({ title, products }: ProductCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Função para rolar o carrossel
  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      // Define a quantidade de rolagem baseada na largura visível (clientWidth)
      // Rolamos cerca de 80% da largura visível para manter o contexto
      const scrollAmount = carouselRef.current.clientWidth * 0.8;

      const newScrollLeft =
        direction === "left"
          ? carouselRef.current.scrollLeft - scrollAmount
          : carouselRef.current.scrollLeft + scrollAmount;

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  // Função para controlar a visibilidade das setas
  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 10); // Pequena margem para evitar falso positivo
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  // Verifica a visibilidade inicial das setas após a montagem do componente
  useEffect(() => {
    handleScroll();
    // Adiciona um listener para redimensionamento da janela
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, [products]); // Re-executa se a lista de produtos mudar

  return (
    <div className="group relative w-full py-5">
      {/* Título da Seção */}
      <h2 className="mb-4 pl-5 text-xl font-bold uppercase">{title}</h2>

      {/* Contêiner do Carrossel */}
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex w-full gap-5 overflow-x-auto scroll-smooth pb-4 pl-5 [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[170px] max-w-[170px] flex-shrink-0"
          >
            <ProductItem product={product} />
          </div>
        ))}
        {/* Espaçador final para garantir que o último item não cole na borda direita */}
        <div className="min-w-[20px] flex-shrink-0"></div>
      </div>

      {/* Setas de Navegação (Estilo Cortina Netflix) */}

      {/* Botão/Cortina Esquerda */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute bottom-[20px] left-0 top-[60px] z-10 flex
                     w-[60px] items-center justify-center
                     bg-gradient-to-r from-black/70 to-transparent
                     opacity-0 transition-opacity duration-300 hover:from-black/90
                     group-hover:opacity-100"
        >
          <div>
            <ChevronLeftIcon className="text-white" size={30} />
          </div>
        </button>
      )}

      {/* Botão/Cortina Direita */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute bottom-[20px] right-0 top-[60px] z-10 flex
                     w-[60px] items-center justify-center
                     bg-gradient-to-l from-black/70 to-transparent
                     opacity-0 transition-opacity duration-300 hover:from-black/90
                     group-hover:opacity-100"
        >
          <div>
            <ChevronRightIcon className="text-white" size={30} />
          </div>
        </button>
      )}
    </div>
  );
};

export default ProductCarousel;
