import { Badge } from "@/components/ui/badge";
import { InfoIcon } from "lucide-react";

export default function SobrePage() {
  return (
    <div className="flex flex-col gap-8 p-5 lg:container lg:mx-auto lg:py-10">
      {/* Cabeçalho da Página */}
      <Badge
        className="w-fit gap-1 border-r-2 border-primary px-3 py-1 text-sm font-semibold uppercase"
        variant="outline"
      >
        <InfoIcon size={16} />
        Institucional
      </Badge>

      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-white">
          Sobre a PurpleTech Store
        </h1>

        {/* 👇 AQUI ENTRA O SEU TEXTO 👇 */}
        {/* Use as tags <p> para parágrafos e <h2> para subtítulos */}

        <div className="flex flex-col gap-4 leading-relaxed text-zinc-300">
          <p>
            A PurpleTech Store nasceu com um propósito claro: tornar a
            tecnologia mais acessível, prática e confiável para todos que buscam
            qualidade na hora de montar ou melhorar seu setup. Desde o início, a
            empresa foi pensada para atender quem valoriza desempenho, bons
            produtos e um atendimento que realmente entende as necessidades de
            cada cliente.
          </p>

          <p>
            Em um mercado que evolui rapidamente, a PurpleTech Store se
            posiciona como uma parceira de quem gosta de tecnologia. A loja
            oferece uma seleção cuidadosa de acessórios e periféricos para
            computador, incluindo fones de ouvido, mouses, teclados, componentes
            e diversos itens essenciais para montar, atualizar ou personalizar
            um PC. Cada produto é escolhido com foco em qualidade, durabilidade
            e no melhor custo-benefício.
          </p>

          <p>
            Mais do que vender acessórios, a PurpleTech busca proporcionar uma
            experiência completa. O objetivo é ajudar cada cliente a encontrar
            exatamente o que precisa para melhorar seu desempenho no trabalho,
            nos estudos ou no universo gamer. Com um atendimento próximo e ágil,
            a empresa trabalha para construir relações de confiança e garantir
            que cada compra seja feita com segurança.
          </p>

          <p>
            O compromisso da PurpleTech Store é continuar evoluindo,
            acompanhando as tendências tecnológicas e ampliando constantemente
            seu catálogo de produtos. A empresa acredita que a tecnologia deve
            ser uma aliada no dia a dia das pessoas, oferecendo soluções que
            facilitem a rotina e elevem a experiência digital.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-white">Missão</h2>
          <p>
            Oferecer acessórios e periféricos de tecnologia com qualidade, preço
            justo e atendimento confiável, ajudando nossos clientes a montar e
            aprimorar seus setups com segurança e praticidade.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-white">Visão</h2>
          <p>
            Ser reconhecida como uma referência em acessórios e periféricos
            tecnológicos, destacando-se pela confiança, inovação e excelência no
            atendimento.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-white">Valores</h2>
          <p>
            Confiança: construir relações transparentes e duradouras com os
            clientes.
          </p>
          <p>
            Qualidade: selecionar produtos que realmente entreguem desempenho e
            durabilidade.
          </p>
          <p>
            Compromisso com o cliente: entender asnecessidades de cada pessoa
            para oferecer a melhor solução.
          </p>
          <p>
            Inovação: acompanhar as tendências tecnológicas e trazer novidades
            ao mercado.
          </p>
          <p>
            Agilidade: garantir um processo de compra rápido, seguro e
            eficiente.
          </p>
        </div>
      </div>
    </div>
  );
}
