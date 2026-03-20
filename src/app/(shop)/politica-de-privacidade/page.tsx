import { Badge } from "@/components/ui/badge";
import { ShieldCheckIcon } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col gap-8 p-5 lg:container lg:mx-auto lg:py-10">
      {/* Cabeçalho da Página */}
      <Badge
        className="w-fit gap-1 border-r-2 border-primary px-3 py-1 text-sm font-semibold uppercase"
        variant="outline"
      >
        <ShieldCheckIcon size={16} />
        Segurança e Transparência
      </Badge>

      <div className="flex flex-col gap-8 lg:w-3/4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white lg:text-4xl">
            Política de Privacidade
          </h1>
          <p className="text-sm text-zinc-500">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>

        {/* Corpo do Texto */}
        <div className="flex flex-col gap-6 leading-relaxed text-zinc-300">
          <p>
            A <strong>PurpleTech Store</strong>, desenvolvida com tecnologia de
            ponta pela{" "}
            <a
              href="https://gmpsaas.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              GMP Technology
            </a>
            , tem o compromisso de garantir a privacidade e a segurança dos
            dados de nossos clientes durante todo o processo de navegação e
            compra no site.
          </p>

          <section className="mt-4 flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              1. Quais dados nós coletamos?
            </h2>
            <p>
              Para que possamos oferecer a melhor experiência de compra e
              garantir a entrega dos seus periféricos e hardwares, coletamos as
              seguintes informações:
            </p>
            <ul className="ml-2 flex list-inside list-disc flex-col gap-2 text-zinc-400">
              <li>
                <strong>Dados Cadastrais:</strong> Nome completo, CPF, e-mail,
                telefone e endereço de entrega.
              </li>
              <li>
                <strong>Dados de Pagamento:</strong> Informações do cartão de
                crédito ou dados para PIX (processados de forma criptografada
                por gateways de pagamento homologados, sem armazenamento em
                nossos servidores).
              </li>
              <li>
                <strong>Dados de Navegação:</strong> Endereço IP, cookies,
                histórico de páginas visitadas e produtos adicionados ao
                carrinho ou lista de favoritos.
              </li>
            </ul>
          </section>

          <section className="mt-4 flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              2. Como utilizamos suas informações?
            </h2>
            <p>
              Todos os dados coletados são utilizados exclusivamente para as
              seguintes finalidades:
            </p>
            <ul className="ml-2 flex list-inside list-disc flex-col gap-2 text-zinc-400">
              <li>
                Processamento, faturamento e envio dos pedidos realizados na
                loja.
              </li>
              <li>
                Comunicação sobre o status do seu pedido ou atendimento de
                suporte.
              </li>
              <li>
                Prevenção contra fraudes e garantia da segurança do usuário.
              </li>
              <li>
                Melhoria contínua da plataforma e personalização de ofertas
                (produtos recomendados).
              </li>
            </ul>
          </section>

          <section className="mt-4 flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              3. Compartilhamento de Dados
            </h2>
            <p>
              A PurpleTech Store <strong>não vende, aluga ou transfere</strong>{" "}
              seus dados para terceiros. O compartilhamento de informações
              ocorre apenas com parceiros estritamente necessários para a
              conclusão do seu pedido, como transportadoras (para entrega) e
              processadores de pagamento (para aprovação da transação).
            </p>
          </section>

          <section className="mt-4 flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              4. Seus Direitos (LGPD)
            </h2>
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (Lei nº
              13.709/2018), você tem o direito de solicitar a qualquer momento:
            </p>
            <ul className="ml-2 flex list-inside list-disc flex-col gap-2 text-zinc-400">
              <li>A confirmação e o acesso aos seus dados pessoais.</li>
              <li>
                A correção de dados incompletos, inexatos ou desatualizados.
              </li>
              <li>
                A exclusão dos seus dados do nosso banco de dados (exceto nos
                casos em que a retenção seja obrigatória por lei, como emissão
                de notas fiscais).
              </li>
            </ul>
          </section>

          <section className="mt-4 flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              5. Fale Conosco
            </h2>
            <p>
              Se você tiver qualquer dúvida sobre nossa Política de Privacidade
              ou desejar exercer seus direitos sob a LGPD, entre em contato com
              nossa equipe de atendimento:
            </p>
            <div className="mt-2 w-fit rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <p className="font-semibold text-white">
                E-mail:{" "}
                <a
                  href="mailto:suporte@purpletech.com.br"
                  className="font-normal text-primary hover:underline"
                >
                  suporte.purpletechstore@gmail.com
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Botão de Voltar */}
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
