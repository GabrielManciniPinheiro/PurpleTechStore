import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MouseIcon,
  TargetIcon,
  ShoppingCartIcon,
  ArrowLeftIcon,
} from "lucide-react";
import Link from "next/link";

const MouseGuide = () => {
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
          <MouseIcon size={16} className="mr-2" /> Guia de Compra
        </Badge>
        <h1 className="text-4xl font-extrabold text-white">
          Encontre o Mouse perfeito para a sua mira
        </h1>

        <div className="prose prose-invert text-zinc-300">
          <h2 className="mt-6 text-2xl font-bold text-white">
            A Pegada (Grip)
          </h2>
          <p>Como você segura o mouse define qual modelo será confortável:</p>
          <ul className="space-y-4">
            <li>
              <strong className="italic text-white">Palm Grip:</strong> Toda a
              palma da mão descansa no mouse. Exige mouses maiores e
              ergonômicos.
            </li>
            <li>
              <strong className="italic text-white">Claw Grip:</strong> Mão em
              forma de garra. Ideal para movimentos rápidos e precisos.
            </li>
            <li>
              <strong className="italic text-white">Fingertip:</strong> Apenas
              as pontas dos dedos tocam o mouse. Exige mouses leves e menores.
            </li>
          </ul>

          <h2 className="mt-8 flex items-center gap-2 text-2xl font-bold text-white">
            <TargetIcon className="text-[#8162FF]" /> DPI vs Sensor
          </h2>
          <p>
            Não se engane por números gigantes de DPI. O mais importante é um{" "}
            <span className="font-bold text-white">
              sensor óptico de qualidade
            </span>{" "}
            (como os da linha Pixart), que garante que o cursor não pule ou
            trema na hora de mirar.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-zinc-800 bg-[#0A0A0A] p-8 text-center shadow-2xl">
          <h3 className="mb-4 text-xl font-bold text-white">
            A mira perfeita começa aqui
          </h3>
          <Button asChild className="bg-[#8162FF] hover:bg-[#6b4ce6]">
            <Link href="/category/mouses">
              <ShoppingCartIcon className="mr-2" size={18} /> Ver Mouses Gamer
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
};
export default MouseGuide;
