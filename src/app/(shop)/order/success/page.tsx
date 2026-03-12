"use client";

import { CheckCircle2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const SuccessPage = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Pega o tamanho da tela para o confete cobrir tudo
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    // Para o confete depois de 8 segundos para não pesar o PC do usuário
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex h-full flex-col items-center justify-center p-5">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={["#8162FF", "#FFFFFF", "#22C55E"]} // Cores: Roxo (sua marca), Branco e Verde
        />
      )}

      <Card className="z-10 flex w-full max-w-md flex-col items-center justify-center p-10 text-center shadow-lg">
        <CheckCircle2Icon className="mb-3 text-green-500" size={64} />

        <h1 className="text-2xl font-bold uppercase italic">
          Compra Concluída!
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Seu pagamento foi confirmado pela <strong>PurpleTech Store</strong>.
          Obrigado pela confiança!
        </p>

        <Button asChild className="mt-8 w-full font-bold uppercase">
          <Link href="/">Voltar para a Home</Link>
        </Button>
      </Card>
    </div>
  );
};

export default SuccessPage;
