import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MonitorIcon, ShoppingCartIcon, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const MonitorGuide = () => {
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
          <MonitorIcon size={16} className="mr-2" /> Guia de Compra
        </Badge>
        <h1 className="text-4xl font-extrabold text-white">
          Guia Definitivo: O monitor certo para o seu Setup
        </h1>

        <div className="prose prose-invert text-zinc-300">
          <h2 className="mt-6 text-2xl font-bold text-white">
            Painel: IPS vs TN vs VA
          </h2>
          <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
              <h4 className="font-bold text-white">IPS</h4>
              <p className="text-xs">
                Melhores cores e ângulos de visão. Ideal para RPGs e Design.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
              <h4 className="font-bold text-white">TN</h4>
              <p className="text-xs">
                Foco total em velocidade. Menor tempo de resposta para E-sports.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
              <h4 className="font-bold text-white">VA</h4>
              <p className="text-xs">
                Melhor contraste. Perfeito para filmes e jogos de
                terror/escuros.
              </p>
            </div>
          </div>

          <h2 className="mt-8 text-2xl font-bold text-white">
            Tempo de Resposta (ms)
          </h2>
          <p>
            Para jogos competitivos, procure sempre monitores com{" "}
            <span className="font-bold text-[#8162FF]">1ms de resposta</span>.
            Isso evita o efeito de fantasma (ghosting) em movimentos rápidos.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-[#8162FF]/30 bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1E] p-8 text-center">
          <h3 className="mb-4 text-xl font-bold text-white">
            Eleve o nível do seu jogo
          </h3>
          <Button asChild className="bg-[#8162FF] hover:bg-[#6b4ce6]">
            <Link href="/category/monitors">
              <ShoppingCartIcon className="mr-2" size={18} /> Ver Monitores
              Gamer
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
};
export default MonitorGuide;
