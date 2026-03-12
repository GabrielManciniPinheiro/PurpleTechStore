import { XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const CancelledPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-5">
      <Card className="flex w-full max-w-md flex-col items-center justify-center p-10 text-center">
        <XCircleIcon className="mb-3 text-red-500" size={64} />

        <h1 className="text-2xl font-bold uppercase italic">
          Pagamento Cancelado
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Infelizmente não conseguimos processar o seu pagamento. Tente
          novamente ou entre em contato com seu banco.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3">
          <Button asChild className="w-full font-bold uppercase">
            <Link href="/">Tentar novamente</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full font-bold uppercase"
          >
            <Link href="/">Voltar para a Home</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CancelledPage;
