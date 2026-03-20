import { Badge } from "@/components/ui/badge";
import { RefreshCcwIcon } from "lucide-react";
import Link from "next/link";

export default function ReturnsPage() {
  return (
    <div className="flex flex-col gap-8 p-5 lg:container lg:mx-auto lg:py-10">
      <Badge
        className="w-fit gap-1 border-r-2 border-primary px-3 py-1 text-sm font-semibold uppercase"
        variant="outline"
      >
        <RefreshCcwIcon size={16} />
        Garantia e Satisfação
      </Badge>

      <div className="flex flex-col gap-8 lg:w-3/4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white lg:text-4xl">
            Trocas e Devoluções
          </h1>
          <p className="text-sm text-zinc-500">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>

        <div className="flex flex-col gap-6 leading-relaxed text-zinc-300">
          <p>
            A PurpleTech Store quer que seu setup fique perfeito. Por isso,
            nossa política de trocas e devoluções foi criada com base no Código
            de Defesa do Consumidor (CDC), garantindo total transparência e
            segurança para você.
          </p>

          <section className="mt-4 flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              1. Direito de Arrependimento (7 dias)
            </h2>
            <p>
              Comprou um teclado, mouse ou gabinete e não curtiu? Conforme o
              Art. 49 do CDC, você tem até{" "}
              <strong>7 (sete) dias corridos</strong>, contados a partir do
              recebimento do pedido, para solicitar a devolução sem nenhum custo
              extra.
            </p>
            <p className="border-l-2 border-primary pl-3 text-sm text-zinc-400">
              <strong>Atenção:</strong> O produto deve ser devolvido na
              embalagem original, sem indícios de uso severo, acompanhado de
              todos os manuais, acessórios e nota fiscal.
            </p>
          </section>

          <section className="mt-4 flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              2. Troca por Defeito (Garantia)
            </h2>
            <p>
              Seu hardware apresentou falhas? Oferecemos garantia legal de{" "}
              <strong>90 (noventa) dias</strong> para defeitos de fabricação.
            </p>
            <ul className="ml-2 flex list-inside list-disc flex-col gap-2 text-zinc-400">
              <li>
                Caso o defeito seja constatado dentro de 7 dias após a entrega,
                a troca é feita diretamente com a PurpleTech.
              </li>
              <li>
                Após os 7 dias, a garantia deverá ser acionada diretamente com a
                fabricante do produto, através de suas assistências técnicas
                autorizadas. Nós te auxiliaremos nesse processo se precisar!
              </li>
            </ul>
          </section>

          <section className="mt-4 flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              3. Como solicitar uma troca ou devolução?
            </h2>
            <p>
              É simples e rápido. Envie um e-mail para o nosso suporte
              informando:
            </p>
            <div className="mt-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 text-sm text-zinc-400">
              <ul className="list-inside list-disc">
                <li>Número do seu pedido (Ex: #1024)</li>
                <li>Seu nome completo e CPF</li>
                <li>
                  Motivo da troca/devolução (com fotos ou vídeos, se for
                  defeito)
                </li>
              </ul>
            </div>
            <p className="mt-2 font-semibold text-white">
              Canal de solicitação:{" "}
              <a
                href="mailto:suporte@purpletech.com.br"
                className="font-normal text-primary hover:underline"
              >
                suporte.purpletechstore@gmail.com
              </a>
            </p>
          </section>

          <section className="mt-4 flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">4. Reembolso</h2>
            <p>
              Após recebermos e analisarmos o produto em nosso centro de
              distribuição (o que leva até 3 dias úteis), o estorno será feito
              na mesma forma de pagamento utilizada na compra (PIX imediato ou
              crédito na próxima fatura do cartão).
            </p>
          </section>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="text-sm text-zinc-400 underline underline-offset-4 transition-colors hover:text-primary"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
