import { Badge } from "@/components/ui/badge";
import {
  KeyboardIcon,
  MonitorIcon,
  MouseIcon,
  HeadphonesIcon,
  BookOpenIcon,
  ArrowRightIcon,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Guias de Compra | PurpleTech Store",
  description:
    "Aprenda a escolher os melhores periféricos para o seu setup gamer.",
};

const BuyingGuidesPage = () => {
  // Array de objetos para facilitar a manutenção no futuro
  const guides = [
    {
      id: "teclados",
      title: "Como escolher o Teclado Mecânico ideal",
      description:
        "Entenda a diferença entre Switches (Red, Blue, Brown), tamanhos (100%, TKL, 60%) e qual é o perfeito para o seu estilo de jogo.",
      icon: <KeyboardIcon size={32} className="text-[#8162FF]" />,
      link: "/blog/guia-teclados", // Link para a matéria que criaremos depois
    },
    {
      id: "monitores",
      title: "Guia Definitivo de Monitores Gamer",
      description:
        "Painel IPS, VA ou TN? Qual a resolução certa para a sua placa de vídeo? Tudo o que você precisa saber antes de comprar.",
      icon: <MonitorIcon size={32} className="text-[#8162FF]" />,
      link: "/blog/guia-monitores",
    },
    {
      id: "mouses",
      title: "O Mouse perfeito para a sua 'Pegada'",
      description:
        "Descubra o que é Palm, Claw e Fingertip. Aprenda sobre DPI, sensores e o peso ideal para jogos competitivos.",
      icon: <MouseIcon size={32} className="text-[#8162FF]" />,
      link: "/blog/guia-mouses",
    },
    {
      id: "headsets",
      title: "Áudio Competitivo: Escolhendo o Headset",
      description:
        "Surround 7.1 vs Estéreo, palco sonoro, qualidade de microfone e conforto para longas sessões de gameplay.",
      icon: <HeadphonesIcon size={32} className="text-[#8162FF]" />,
      link: "/blog/guia-headsets",
    },
  ];

  return (
    <div className="flex w-full flex-col items-center p-6 pb-20 md:p-10">
      {/* Header da Página */}
      <div className="mb-12 flex w-full max-w-5xl flex-col items-center text-center">
        <Badge
          variant="heading"
          className="mb-4 w-fit border-[#8162FF]/20 bg-[#8162FF]/10 text-[#8162FF]"
        >
          <BookOpenIcon size={16} className="mr-2" />
          PurpleTech Academy
        </Badge>
        <h1 className="mb-4 text-3xl font-extrabold text-white md:text-5xl">
          Guias de Compra
        </h1>
        <p className="max-w-2xl text-lg text-zinc-400">
          Não sabe qual periférico escolher? Nossos guias foram feitos para te
          ajudar a montar o setup perfeito, sem gastar dinheiro com o que você
          não precisa.
        </p>
      </div>

      {/* Grid de Guias */}
      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {guides.map((guide) => (
          <Link href={guide.link} key={guide.id}>
            <div className="group flex h-full flex-col justify-between rounded-2xl border border-zinc-800 bg-[#0A0A0A] p-8 transition-all hover:border-[#8162FF]/50 hover:bg-[#121214] hover:shadow-[0_0_20px_-5px_rgba(129,98,255,0.15)]">
              <div className="flex flex-col gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#8162FF]/10 transition-transform group-hover:scale-110">
                  {guide.icon}
                </div>
                <h2 className="text-xl font-bold text-white transition-colors group-hover:text-[#8162FF]">
                  {guide.title}
                </h2>
                <p className="leading-relaxed text-zinc-400">
                  {guide.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#8162FF]">
                Ler Guia Completo
                <ArrowRightIcon
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BuyingGuidesPage;
