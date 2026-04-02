import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  MonitorIcon,
  ZapIcon,
  Gamepad2Icon,
  ShoppingCartIcon,
  CheckCircle2Icon,
} from "lucide-react";
import Link from "next/link";

const MonitorHzArticlePage = () => {
  return (
    <div className="flex w-full flex-col items-center p-6 pb-20 md:p-10">
      {/* Botão de Voltar */}
      <div className="mb-8 w-full max-w-3xl">
        <Link
          href="/"
          className="flex w-fit items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-[#8162FF]"
        >
          <ArrowLeftIcon size={16} />
          Voltar para o inicio
        </Link>
      </div>

      <article className="flex w-full max-w-3xl flex-col gap-8">
        {/* Cabeçalho do Artigo */}
        <div className="flex flex-col gap-4 border-b border-zinc-800 pb-8">
          <Badge
            variant="heading"
            className="w-fit border-[#8162FF]/20 bg-[#8162FF]/10 text-[#8162FF]"
          >
            <MonitorIcon size={16} className="mr-2" />
            Hardware & Dicas
          </Badge>
          <h1 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
            Como funcionam os Hz de um monitor? Entenda por que isso muda sua
            gameplay
          </h1>
          <p className="text-lg text-zinc-400">
            Apesar de parecer um detalhe técnico, a taxa de atualização é um dos
            fatores mais importantes para definir a qualidade da imagem e o
            desempenho nos jogos.
          </p>
        </div>

        {/* Conteúdo Principal */}
        <div className="prose prose-invert max-w-none text-zinc-300">
          <p className="text-lg leading-relaxed">
            Ao procurar um monitor gamer, é comum encontrar especificações como
            60Hz, 144Hz ou 240Hz. Entender como os Hz funcionam é essencial para
            fazer uma escolha inteligente e evitar investir em um equipamento
            que não será totalmente aproveitado.
          </p>

          <h2 className="mb-4 mt-10 flex items-center gap-2 text-2xl font-bold text-white">
            <ZapIcon className="text-[#8162FF]" size={24} />O que são os Hz de
            um monitor
          </h2>
          <p className="leading-relaxed">
            Os Hertz (Hz) indicam quantas vezes por segundo a imagem exibida na
            tela é atualizada. Em termos práticos, um monitor de 60Hz atualiza a
            imagem 60 vezes por segundo, enquanto um de 144Hz faz isso 144
            vezes.
          </p>
          <p className="mt-4 leading-relaxed">
            Essa taxa de atualização está diretamente ligada à fluidez da
            imagem. Quanto maior o número de Hz, mais suaves e naturais serão os
            movimentos na tela. Isso é especialmente relevante em jogos, onde
            cada milissegundo pode fazer diferença.
          </p>

          <h2 className="mb-4 mt-10 text-2xl font-bold text-white">
            Qual a diferença entre Hz e FPS?
          </h2>
          <p className="leading-relaxed">
            Um ponto importante para quem está pesquisando *melhor monitor
            gamer* é entender a diferença entre Hz e FPS.
          </p>
          <div className="my-6 rounded-lg border border-zinc-800 bg-[#0A0A0A] p-6">
            <ul className="flex flex-col gap-3 text-zinc-300">
              <li>
                <strong className="text-[#8162FF]">Hz (Hertz):</strong>{" "}
                Pertencem ao monitor e indicam a capacidade física de
                atualização da tela.
              </li>
              <li>
                <strong className="text-[#8162FF]">
                  FPS (Frames por Segundo):
                </strong>{" "}
                É gerado pela sua placa de vídeo e representa quantos quadros o
                seu computador consegue produzir.
              </li>
            </ul>
          </div>
          <p className="leading-relaxed">
            Para aproveitar um monitor de 144Hz, por exemplo, é necessário que o
            seu PC consiga rodar os jogos próximos de 144 FPS. Caso contrário,
            você não terá ganho real de desempenho, mesmo utilizando um monitor
            mais avançado.
          </p>

          <h2 className="mb-4 mt-10 flex items-center gap-2 text-2xl font-bold text-white">
            <Gamepad2Icon className="text-[#8162FF]" size={24} />
            Por que monitores com mais Hz são melhores para jogos?
          </h2>
          <p className="mb-4 leading-relaxed">
            A principal vantagem de um monitor com alta taxa de atualização é a
            melhoria na fluidez da imagem. Em jogos competitivos, isso se traduz
            em:
          </p>
          <ul className="mb-6 flex flex-col gap-2 pl-4">
            <li className="flex items-center gap-2">
              <CheckCircle2Icon size={16} className="text-emerald-500" />{" "}
              Movimentos mais suaves
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2Icon size={16} className="text-emerald-500" /> Maior
              precisão ao mirar
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2Icon size={16} className="text-emerald-500" /> Menor
              atraso visual (input lag)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2Icon size={16} className="text-emerald-500" />{" "}
              Redução de efeitos como borrões e ghosting
            </li>
          </ul>
          <p className="leading-relaxed">
            Em títulos de FPS (First-Person Shooter), a diferença entre 60Hz e
            144Hz é brutal. A imagem fica mais limpa durante movimentos rápidos,
            permitindo uma leitura muito melhor do cenário.
          </p>

          <h2 className="mb-4 mt-10 text-2xl font-bold text-white">
            Diferença prática entre 60Hz, 144Hz e 240Hz
          </h2>
          <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
              <h3 className="mb-2 font-bold text-white">60Hz</h3>
              <p className="text-sm text-zinc-400">
                Padrão comum. Atende bem para o dia a dia, mas apresenta
                limitações visíveis em jogos rápidos.
              </p>
            </div>
            <div className="rounded-lg border border-[#8162FF]/30 bg-[#8162FF]/10 p-5">
              <h3 className="mb-2 font-bold text-[#8162FF]">144Hz</h3>
              <p className="text-sm text-zinc-400">
                O melhor custo-benefício. Oferece um salto claro de fluidez e é
                ideal para a maioria dos gamers.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
              <h3 className="mb-2 font-bold text-white">240Hz+</h3>
              <p className="text-sm text-zinc-400">
                Foco em E-sports e cenário competitivo. Exige um PC high-end
                para justificar o investimento.
              </p>
            </div>
          </div>

          <h2 className="mb-4 mt-10 text-2xl font-bold text-white">
            O que considerar antes de comprar um monitor gamer
          </h2>
          <p className="mb-4 leading-relaxed">
            Antes de escolher o seu novo monitor, avalie estes pontos cruciais
            que impactam diretamente no desempenho:
          </p>
          <ul className="mb-8 flex flex-col gap-2 pl-4 text-zinc-300">
            <li className="list-disc">
              A compatibilidade da sua placa de vídeo para entregar altas taxas
              de FPS.
            </li>
            <li className="list-disc">
              O tipo de conexão disponível (prefira sempre DisplayPort para
              altas taxas de Hz).
            </li>
            <li className="list-disc">
              A resolução do monitor (Full HD é mais leve para pegar 144Hz+,
              Quad HD/4K exigem muito mais do PC).
            </li>
            <li className="list-disc">
              O tipo de painel (IPS para cores vivas, TN para o menor tempo de
              resposta, VA para bom contraste).
            </li>
          </ul>
        </div>

        {/* CTA - Call to Action */}
        <div className="mt-8 flex flex-col items-center justify-center gap-5 rounded-2xl border border-[#8162FF]/30 bg-gradient-to-b from-[#1A1A1E] to-[#0A0A0A] p-8 text-center shadow-[0_0_30px_-10px_rgba(129,98,255,0.2)]">
          <h2 className="text-2xl font-bold text-white">
            Pronto para dar o próximo passo?
          </h2>
          <p className="max-w-xl text-zinc-400">
            Na PurpleTech Store você encontra opções selecionadas com foco em
            desempenho, qualidade e preço competitivo. Faça o upgrade do seu
            setup hoje mesmo.
          </p>

          {/* 👇 Aqui está o link que leva o cliente para a categoria de monitores */}
          <Button
            asChild
            className="mt-4 bg-[#8162FF] px-8 py-6 text-base font-bold uppercase hover:bg-[#6b4ce6]"
          >
            <Link href="/category/monitors">
              <ShoppingCartIcon className="mr-2" size={20} />
              Ver Monitores Gamer
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
};

export default MonitorHzArticlePage;
