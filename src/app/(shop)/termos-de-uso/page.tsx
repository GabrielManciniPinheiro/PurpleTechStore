import { Badge } from "@/components/ui/badge";
import { FileTextIcon } from "lucide-react";
import Link from "next/link";

export default function TermsOfUsePage() {
  return (
    <div className="flex flex-col gap-8 p-5 lg:container lg:mx-auto lg:py-10">
      <Badge
        className="w-fit gap-1 border-r-2 border-primary px-3 py-1 text-sm font-semibold uppercase"
        variant="outline"
      >
        <FileTextIcon size={16} />
        Regras e Condições
      </Badge>

      <div className="flex flex-col gap-8 lg:w-3/4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white lg:text-4xl">
            Termos de Uso
          </h1>
          <p className="text-sm text-zinc-500">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>

        <div className="flex flex-col gap-6 leading-relaxed text-zinc-300">
          <p>
            Bem-vindo à <strong>PurpleTech Store</strong>. Ao acessar e utilizar
            nosso site, você concorda com os Termos de Uso descritos abaixo.
            Leia atentamente antes de realizar qualquer compra.
          </p>

          <section className="mt-4 flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              1. Cadastro e Conta de Usuário
            </h2>
            <p>
              Para realizar compras, você precisará criar uma conta através do
              nosso sistema de autenticação segura (Google Login ou
              E-mail/Senha). Você é o único responsável por manter a
              confidencialidade das suas credenciais e por todas as atividades
              que ocorrerem sob sua conta.
            </p>
          </section>

          <section className="mt-4 flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              2. Preços e Disponibilidade
            </h2>
            <p>
              Trabalhamos duro para manter o estoque 100% atualizado. No
              entanto, a inclusão de um produto no carrinho não garante a sua
              reserva. O produto só é reservado após a confirmação final do
              pagamento. Os preços e os descontos (como nossas campanhas de
              frete grátis) podem ser alterados sem aviso prévio.
            </p>
          </section>

          <section className="mt-4 flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              3. Propriedade Intelectual
            </h2>
            <p>
              Todo o conteúdo visual, design, arquitetura de software e
              código-fonte deste e-commerce são de propriedade exclusiva da
              PurpleTech Store e foram desenvolvidos em parceria com a{" "}
              <a
                href="https://gmpsaas.com"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                GMP Technology
              </a>
              . A cópia, reprodução ou uso não autorizado de qualquer elemento
              do site é estritamente proibida.
            </p>
          </section>

          <section className="mt-4 flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              4. Obrigações do Usuário
            </h2>
            <ul className="ml-2 flex list-inside list-disc flex-col gap-2 text-zinc-400">
              <li>
                Fornecer dados reais e atualizados para a emissão de notas
                fiscais e entrega.
              </li>
              <li>
                Não utilizar a plataforma para fins ilegais, fraudulentos ou que
                violem as leis brasileiras.
              </li>
              <li>
                Não tentar explorar vulnerabilidades de segurança da nossa
                infraestrutura.
              </li>
            </ul>
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
