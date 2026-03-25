import {
  CreditCardIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  SmartphoneNfcIcon,
  BarcodeIcon, // 👇 Ícone novo para o Boleto
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "./separator";

const Footer = () => {
  return (
    <footer className="w-full border-t border-zinc-800 bg-zinc-950 pt-10 text-white">
      <div className="mx-auto flex max-w-[1920px] flex-col gap-10 px-5 md:px-[1.875rem] lg:flex-row lg:justify-between lg:gap-20">
        {/* Coluna 1: Marca e Confiança */}
        <div className="flex flex-col gap-4 lg:w-1/4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/PurpleTechLogo.png"
              alt="PurpleTech Store Logo"
              width={100}
              height={100}
              quality={100}
              className="h-[50px] w-[50px] object-contain"
            />
            <h1 className="text-xl font-semibold">
              <span className="text-primary">PurpleTech</span> Store
            </h1>
          </Link>
          <p className="text-sm text-zinc-400">
            A sua loja definitiva para periféricos e hardwares de alta
            performance. Qualidade, garantia e o melhor preço para o seu setup.
          </p>
          <div className="mt-2 flex items-center gap-2 text-emerald-400">
            <ShieldCheckIcon size={20} />
            <span className="text-sm font-semibold">Ambiente 100% Seguro</span>
          </div>
        </div>

        {/* Coluna 2: Links e Pagamentos */}
        <div className="flex flex-col gap-8 sm:flex-row sm:flex-wrap lg:w-3/4 lg:justify-between">
          {/* Fale Conosco */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold uppercase tracking-wider text-zinc-100">
              Atendimento
            </h3>
            <div className="flex flex-col gap-3 text-sm text-zinc-400">
              <a
                href="mailto:suporte@purpletech.com.br"
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <MailIcon size={16} /> suporte.purpletechstore@gmail.com.br
              </a>
              <a
                href="#"
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <PhoneIcon size={16} /> (11) 99999-9999
              </a>
              <div className="flex items-start gap-2">
                <MapPinIcon size={16} className="mt-1 shrink-0" />
                <span>
                  Av. Paulista, 1000 - Bela Vista
                  <br />
                  São Paulo - SP, 01310-100
                </span>
              </div>
            </div>
          </div>

          {/* 👇 NOVA COLUNA: Mundo Tech (Blog) */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold uppercase tracking-wider text-zinc-100">
              Purple Blog
            </h3>
            <div className="flex flex-col gap-3 text-sm text-zinc-400">
              <Link
                href="/blog/reviews"
                className="transition-colors hover:text-primary"
              >
                Reviews de Setup
              </Link>
              <Link
                href="/blog/guias"
                className="transition-colors hover:text-primary"
              >
                Guias de Compra
              </Link>
              <Link
                href="/blog/top-5-2026"
                className="transition-colors hover:text-primary"
              >
                Como funcionam os Hz de um monitor?
              </Link>
            </div>
          </div>

          {/* Links Úteis */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold uppercase tracking-wider text-zinc-100">
              Institucional
            </h3>
            <div className="flex flex-col gap-3 text-sm text-zinc-400">
              <Link
                href="/sobre"
                className="transition-colors hover:text-primary"
              >
                Sobre a PurpleTech
              </Link>
              <Link
                href="/politica-de-privacidade"
                className="transition-colors hover:text-primary"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/termos-de-uso"
                className="transition-colors hover:text-primary"
              >
                Termos de Uso
              </Link>
              <Link
                href="/trocas-e-devolucoes"
                className="transition-colors hover:text-primary"
              >
                Trocas e Devoluções
              </Link>
            </div>
          </div>

          {/* 👇 Formas de Pagamento - Padronizado com o resto do Footer */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold uppercase tracking-wider text-zinc-100">
              Pagamento
            </h3>
            {/* Lista vertical, seguindo a mesma estrutura das outras colunas */}
            <div className="flex flex-col gap-3 text-sm text-zinc-400">
              <div className="flex items-center gap-3">
                <CreditCardIcon size={20} className="shrink-0 text-zinc-100" />
                <span>Cartão de Crédito</span>
              </div>
              <div className="flex items-center gap-3">
                {/* Reutilizando o ícone, mas você pode usar o SmartphoneNfcIcon se preferir */}
                <CreditCardIcon size={20} className="shrink-0 text-zinc-100" />
                <span>Cartão de Débito</span>
              </div>
              <div className="flex items-center gap-3">
                <SmartphoneNfcIcon
                  size={20}
                  className="shrink-0 text-zinc-100"
                />
                <span>Pix</span>
              </div>
              <div className="flex items-center gap-3">
                <BarcodeIcon size={20} className="shrink-0 text-zinc-100" />
                <span>Boleto Bancário</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="mt-10 bg-zinc-800" />

      {/* Rodapé Base: Direitos e Autoria */}
      <div className="mx-auto flex max-w-[1920px] flex-col items-center justify-between gap-4 p-5 text-center text-xs text-zinc-500 md:flex-row md:text-left">
        <p>
          © {new Date().getFullYear()} PurpleTech Store. Todos os direitos
          reservados. CNPJ: 00.000.000/0001-00.
        </p>
        <p>
          Desenvolvido por{" "}
          <a
            href="https://gmpsaas.com"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-primary hover:underline"
          >
            GMP Technology
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
