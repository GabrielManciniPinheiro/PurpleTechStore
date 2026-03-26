"use client";

import { useState, useContext, useEffect, useMemo } from "react";
import Image from "next/image";
import { CartContext } from "@/providers/cart";
import {
  createOrder,
  OrderProductPayload,
  checkPixPayment,
  cancelOrder,
} from "@/actions/order";
import { CreditCardInfo } from "@/lib/asaas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CopyIcon,
  Loader2,
  ClockIcon,
  MapPinIcon,
  CreditCardIcon,
  FileTextIcon,
  CheckCircle2Icon,
} from "lucide-react";

// 👇 Importando o toast
import toast from "react-hot-toast";

interface CheckoutFormProps {
  userId: string;
}

const CheckoutForm = ({ userId }: CheckoutFormProps) => {
  const { products, clearCart, total } = useContext(CartContext);

  const [paymentMethod, setPaymentMethod] = useState<
    "PIX" | "CREDIT_CARD" | "BOLETO"
  >("PIX");
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);

  // Cartão
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCcv, setCardCcv] = useState("");
  const [installments, setInstallments] = useState(1);

  // Endereço
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isFetchingCep, setIsFetchingCep] = useState(false);

  // Respostas de Pagamento
  const [pixData, setPixData] = useState<{
    qrCode: string;
    copyPaste: string;
  } | null>(null);
  const [boletoUrl, setBoletoUrl] = useState<string | null>(null);

  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(900);

  // REGRA DE NEGÓCIO DAS PARCELAS
  const maxInstallments = useMemo(() => {
    if (total > 200) return 12;
    if (total >= 100) return 6;
    return 2;
  }, [total]);

  // Se o total mudar e a parcela escolhida ficar maior que o permitido, reseta pra 1
  useEffect(() => {
    if (installments > maxInstallments) {
      setInstallments(1);
    }
  }, [maxInstallments, installments]);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpf(value);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(value);
  };

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) value = `${value.slice(0, 2)}/${value.slice(2)}`;
    setCardExpiry(value);
  };

  const handleCcvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    setCardCcv(value);
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    const formattedCep = value.replace(/(\d{5})(\d)/, "$1-$2");
    setCep(formattedCep);

    if (value.length === 8) {
      setIsFetchingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setStreet(data.logradouro);
          setNeighborhood(data.bairro);
          setCity(data.localidade);
          setState(data.uf);
        }
      } catch (err) {
        console.error("Erro ao buscar CEP", err);
      } finally {
        setIsFetchingCep(false);
      }
    }
  };

  useEffect(() => {
    if (!paymentId || paymentMethod !== "PIX" || !createdOrderId) return;
    const intervalId = setInterval(async () => {
      try {
        const isPaid = await checkPixPayment(paymentId, createdOrderId);
        if (isPaid) {
          clearInterval(intervalId);
          clearCart();
          window.location.href = "/order/success";
        }
      } catch (error) {
        console.error(error);
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [paymentId, paymentMethod, createdOrderId, clearCart]);

  useEffect(() => {
    if (!pixData || timeLeft <= 0) return;
    const timerId = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(timerId);
  }, [pixData, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && createdOrderId && paymentMethod === "PIX") {
      cancelOrder(createdOrderId).then(() => {
        clearCart();
        window.location.href = "/order/cancelled";
      });
    }
  }, [timeLeft, createdOrderId, clearCart, paymentMethod]);

  const handleCheckout = async () => {
    if (!cep || !street || !number || !city || !state || !cpf) {
      // 👇 Trocando o alert nativo pelo toast de erro
      toast.error(
        "Por favor, preencha todos os campos obrigatórios (Endereço e CPF).",
      );
      return;
    }

    try {
      setLoading(true);

      let creditCardData: CreditCardInfo | undefined = undefined;

      if (paymentMethod === "CREDIT_CARD") {
        const [expiryMonth, expiryYear] = cardExpiry.split("/");
        creditCardData = {
          holderName: cardName,
          number: cardNumber.replace(/\D/g, ""),
          expiryMonth,
          expiryYear,
          ccv: cardCcv,
        };
      }

      const sanitizedProducts: OrderProductPayload[] = products.map(
        (product) => ({
          id: product.id,
          basePrice:
            typeof product.basePrice === "object"
              ? Number(product.basePrice.toString())
              : Number(product.basePrice),
          discountPercentage: product.discountPercentage,
          quantity: product.quantity,
        }),
      );

      const fullAddress = `${street}, ${number} - ${neighborhood}${
        complement ? ` (${complement})` : ""
      }`;

      const response = await createOrder(
        sanitizedProducts,
        userId,
        paymentMethod,
        cpf.replace(/\D/g, ""),
        creditCardData,
        {
          address: fullAddress,
          city,
          state,
          zipCode: cep,
        },
        installments,
      );

      setCreatedOrderId(response.orderId);

      if (response.paymentMethod === "PIX" && response.pixQrCodeBase64) {
        setPixData({
          qrCode: response.pixQrCodeBase64,
          copyPaste: response.pixCopyAndPaste || "",
        });
        setPaymentId(response.paymentId);
      } else if (response.paymentMethod === "BOLETO" && response.bankSlipUrl) {
        setBoletoUrl(response.bankSlipUrl);
      } else if (response.paymentMethod === "CREDIT_CARD") {
        clearCart();
        window.location.href = "/order/success";
      }
    } catch (error) {
      // 👇 Trocando o alert nativo pelo toast de erro
      toast.error(
        "Ops! Ocorreu um erro. Verifique seus dados de pagamento ou CPF.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPix = () => {
    if (pixData) {
      navigator.clipboard.writeText(pixData.copyPaste);
      // 👇 Trocando o alert nativo pelo toast de sucesso
      toast.success("Chave PIX copiada com sucesso!");
    }
  };

  const handleBoletoFinish = () => {
    clearCart();
    window.location.href = "/order/success";
  };

  // TELA DE SUCESSO PIX
  if (pixData) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds,
    ).padStart(2, "0")}`;
    const timerColor = timeLeft < 60 ? "text-red-500" : "text-[#8162FF]";

    return (
      <div className="flex flex-col items-center gap-5 rounded-lg border border-gray-800 bg-[#121214] p-8 text-white">
        <h3 className="text-xl font-bold text-[#8162FF]">Pague com PIX</h3>
        <div className="flex items-center gap-2 rounded-full border border-gray-800 bg-[#1A1A1E] px-4 py-2">
          <ClockIcon className={`h-5 w-5 ${timerColor}`} />
          <span className={`font-mono text-lg font-bold ${timerColor}`}>
            {formattedTime}
          </span>
        </div>
        <p className="-mt-3 text-center text-xs text-gray-500">
          O pedido será cancelado se o tempo expirar.
        </p>
        <Image
          src={`data:image/jpeg;base64,${pixData.qrCode}`}
          alt="QR Code PIX"
          width={192}
          height={192}
          className="rounded-lg border-2 border-[#8162FF] p-2"
        />
        <Button
          onClick={handleCopyPix}
          className="mt-2 w-full bg-[#8162FF] font-bold hover:bg-[#6b4ce6]"
        >
          <CopyIcon className="mr-2 h-4 w-4" /> Copiar código PIX
        </Button>
      </div>
    );
  }

  // TELA DE SUCESSO BOLETO
  if (boletoUrl) {
    return (
      <div className="flex flex-col items-center gap-6 rounded-lg border border-gray-800 bg-[#121214] p-8 text-center text-white">
        <CheckCircle2Icon className="h-16 w-16 text-[#8162FF]" />
        <div>
          <h3 className="text-xl font-bold">Boleto Gerado!</h3>
          <p className="mt-2 text-sm text-gray-400">
            Seu pedido foi reservado. O pagamento pode levar até 2 dias úteis
            para ser compensado após o pagamento.
          </p>
        </div>

        <Button
          asChild
          className="w-full border border-gray-700 bg-[#1A1A1E] font-bold hover:bg-gray-800"
        >
          <a href={boletoUrl} target="_blank" rel="noopener noreferrer">
            <FileTextIcon className="mr-2 h-4 w-4 text-[#8162FF]" />{" "}
            Acessar/Imprimir Boleto
          </a>
        </Button>

        <Button
          onClick={handleBoletoFinish}
          className="w-full bg-[#8162FF] font-bold hover:bg-[#6b4ce6]"
        >
          Concluir Pedido
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 rounded-lg border border-gray-800 bg-[#121214] p-6 text-left text-white">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-[#8162FF]">
          <MapPinIcon size={20} />
          <h2 className="text-lg font-bold">Endereço de Entrega</h2>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">CEP</label>
          <div className="relative">
            <Input
              placeholder="00000-000"
              value={cep}
              onChange={handleCepChange}
              className="border-gray-700 bg-transparent focus-visible:ring-[#8162FF]"
            />
            {isFetchingCep && (
              <Loader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin text-gray-400" />
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-[2] flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Rua</label>
            <Input
              placeholder="Rua..."
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="border-gray-700 bg-transparent focus-visible:ring-[#8162FF]"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Número</label>
            <Input
              placeholder="123"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="border-gray-700 bg-transparent focus-visible:ring-[#8162FF]"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Bairro</label>
            <Input
              placeholder="Bairro"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="border-gray-700 bg-transparent focus-visible:ring-[#8162FF]"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">
              Complemento
            </label>
            <Input
              placeholder="Apto..."
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
              className="border-gray-700 bg-transparent focus-visible:ring-[#8162FF]"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-[2] flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Cidade</label>
            <Input
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border-gray-700 bg-transparent focus-visible:ring-[#8162FF]"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">UF</label>
            <Input
              placeholder="SP"
              value={state}
              onChange={(e) => setState(e.target.value.toUpperCase())}
              maxLength={2}
              className="border-gray-700 bg-transparent focus-visible:ring-[#8162FF]"
            />
          </div>
        </div>
      </div>

      <div className="h-[1px] w-full bg-gray-800" />

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-[#8162FF]">
          <CreditCardIcon size={20} />
          <h2 className="text-lg font-bold">Pagamento</h2>
        </div>

        <div className="flex gap-2">
          <Button
            variant={paymentMethod === "PIX" ? "default" : "outline"}
            onClick={() => setPaymentMethod("PIX")}
            className={`flex-1 ${
              paymentMethod === "PIX"
                ? "bg-[#8162FF] text-white hover:bg-[#6b4ce6]"
                : "border-gray-700 text-gray-400"
            }`}
          >
            PIX
          </Button>
          <Button
            variant={paymentMethod === "CREDIT_CARD" ? "default" : "outline"}
            onClick={() => setPaymentMethod("CREDIT_CARD")}
            className={`flex-1 ${
              paymentMethod === "CREDIT_CARD"
                ? "bg-[#8162FF] text-white hover:bg-[#6b4ce6]"
                : "border-gray-700 text-gray-400"
            }`}
          >
            Cartão
          </Button>
          <Button
            variant={paymentMethod === "BOLETO" ? "default" : "outline"}
            onClick={() => setPaymentMethod("BOLETO")}
            className={`flex-1 ${
              paymentMethod === "BOLETO"
                ? "bg-[#8162FF] text-white hover:bg-[#6b4ce6]"
                : "border-gray-700 text-gray-400"
            }`}
          >
            Boleto
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">
            CPF do Titular
          </label>
          <Input
            placeholder="000.000.000-00"
            value={cpf}
            onChange={handleCpfChange}
            className="border-gray-700 bg-transparent focus-visible:ring-[#8162FF]"
          />
        </div>

        {paymentMethod === "CREDIT_CARD" && (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300">
                Nome no Cartão
              </label>
              <Input
                placeholder="Ex: GABRIEL M PINHEIRO"
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                className="border-gray-700 bg-transparent focus-visible:ring-[#8162FF]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300">
                Número do Cartão
              </label>
              <Input
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={handleCardNumberChange}
                className="border-gray-700 bg-transparent focus-visible:ring-[#8162FF]"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">
                  Validade
                </label>
                <Input
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={handleCardExpiryChange}
                  className="border-gray-700 bg-transparent focus-visible:ring-[#8162FF]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <label className="text-sm font-medium text-gray-300">CVV</label>
                <Input
                  placeholder="123"
                  value={cardCcv}
                  onChange={handleCcvChange}
                  className="border-gray-700 bg-transparent focus-visible:ring-[#8162FF]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300">
                Parcelamento
              </label>
              <select
                value={installments}
                onChange={(e) => setInstallments(Number(e.target.value))}
                className="flex h-10 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#8162FF]"
              >
                {Array.from({ length: maxInstallments }).map((_, i) => (
                  <option
                    key={i + 1}
                    value={i + 1}
                    className="bg-[#121214] text-white"
                  >
                    {i + 1}x de R$ {(total / (i + 1)).toFixed(2)}{" "}
                    {i === 0 ? "à vista" : "sem juros"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={handleCheckout}
        disabled={loading || products.length === 0}
        className="mt-2 w-full bg-[#8162FF] py-6 font-bold uppercase hover:bg-[#6b4ce6]"
      >
        {loading ? "Processando..." : `Pagar R$ ${total.toFixed(2)}`}
      </Button>
    </div>
  );
};

export default CheckoutForm;
