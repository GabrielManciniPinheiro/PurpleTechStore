import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HeadphonesIcon,
  Volume2Icon,
  ShoppingCartIcon,
  ArrowLeftIcon,
} from "lucide-react";
import Link from "next/link";

const AudioGuide = () => {
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
          <HeadphonesIcon size={16} className="mr-2" /> Guia de Compra
        </Badge>
        <h1 className="text-4xl font-extrabold text-white">
          Áudio Competitivo: Ouvindo cada passo
        </h1>

        <div className="prose prose-invert text-zinc-300">
          <h2 className="mt-6 text-2xl font-bold text-white">
            Estéreo vs Surround 7.1
          </h2>
          <p>
            Para jogos competitivos como CS ou Valorant, um bom som{" "}
            <span className="font-bold text-white">Estéreo</span> com um palco
            sonoro amplo costuma ser melhor do que o 7.1 virtual, que muitas
            vezes distorce a posição real dos inimigos.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-white">
            Conforto é tudo
          </h2>
          <p>Verifique o material das almofadas:</p>
          <ul className="space-y-2">
            <li>
              <strong className="text-[#8162FF]">Couro Sintético:</strong>{" "}
              Melhor isolamento acústico, mas esquenta mais no verão.
            </li>
            <li>
              <strong className="text-[#8162FF]">Tecido (Mesh):</strong> Deixa a
              orelha respirar, ideal para sessões de 5h+ de jogo.
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-zinc-800 bg-gradient-to-t from-[#0A0A0A] to-[#121214] p-8 text-center">
          <h3 className="mb-4 text-xl font-bold text-white">
            Ouça o que os outros ignoram
          </h3>
          <Button asChild className="bg-[#8162FF] hover:bg-[#6b4ce6]">
            <Link href="/category/headphones">
              <ShoppingCartIcon className="mr-2" size={18} /> Ver Headsets e
              Fones
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
};
export default AudioGuide;
