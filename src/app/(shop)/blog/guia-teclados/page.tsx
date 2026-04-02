import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  KeyboardIcon,
  CheckCircle2Icon,
  ShoppingCartIcon,
  ArrowLeftIcon,
} from "lucide-react";
import Link from "next/link";

const KeyboardGuide = () => {
  return (
    <div className="flex w-full flex-col items-center p-6 pb-20 md:p-10">
      <article className="flex w-full max-w-3xl flex-col gap-8">
        <Link
          href="/blog/guias"
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-[#8162FF]"
        >
          <ArrowLeftIcon size={16} /> Voltar
        </Link>
        <Badge
          variant="heading"
          className="w-fit border-[#8162FF]/20 bg-[#8162FF]/10 text-[#8162FF]"
        >
          <KeyboardIcon size={16} className="mr-2" /> Guia de Compra
        </Badge>
        <h1 className="text-4xl font-extrabold text-white">
          Como escolher o Teclado Mecânico ideal
        </h1>

        <div className="prose prose-invert text-zinc-300">
          <h2 className="mt-6 text-2xl font-bold text-white">
            1. Entenda os Switches
          </h2>
          <p>
            O coração do teclado mecânico é o switch. Cada cor representa uma
            sensação diferente:
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <strong className="text-[#8162FF]">Switch Blue:</strong> Clique
              audível e tátil. Ótimo para quem escreve muito, mas pode incomodar
              em chamadas de voz.
            </li>
            <li>
              <strong className="text-[#8162FF]">Switch Red:</strong> Linear e
              silencioso. É o favorito dos gamers de FPS por ser rápido e leve.
            </li>
            <li>
              <strong className="text-[#8162FF]">Switch Brown:</strong> O
              equilíbrio. Tem um relevo tátil, mas sem o barulho alto do Blue.
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-white">
            2. Formato e Tamanho
          </h2>
          <p>
            Nem todo o teclado precisa ter todas as teclas. Escolha o tamanho
            baseado no seu espaço:
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <strong className="text-white">Full Size (100%):</strong> Tem o
              teclado numérico. Ideal para quem também trabalha com planilhas.
            </li>
            <li>
              <strong className="text-white">TKL (80%):</strong> Remove o
              numérico, dando mais espaço para o mouse.
            </li>
            <li>
              <strong className="text-white">60%:</strong> Super compacto.
              Apenas o essencial para o jogo.
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-[#8162FF]/30 bg-[#1A1A1E] p-8 text-center">
          <h3 className="mb-4 text-xl font-bold text-white">
            Pronto para o upgrade?
          </h3>
          <Button asChild className="bg-[#8162FF] hover:bg-[#6b4ce6]">
            <Link href="/category/keyboards">
              <ShoppingCartIcon className="mr-2" size={18} /> Ver Teclados na
              Loja
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
};
export default KeyboardGuide;
