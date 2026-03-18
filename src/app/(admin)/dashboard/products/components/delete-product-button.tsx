"use client";

import { Button } from "@/components/ui/button"; // Verifique se o caminho do seu Button é esse mesmo
import { TrashIcon, Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { deleteProduct } from "./action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // Verifique se o caminho do seu AlertDialog é esse

interface DeleteProductButtonProps {
  productId: string;
  productName: string;
}

export const DeleteProductButton = ({
  productId,
  productName,
}: DeleteProductButtonProps) => {
  // useTransition é perfeito para Server Actions: ele gerencia o estado de "loading" automaticamente
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteProduct(productId);
      // Como tem o revalidatePath na Action, a tabela vai atualizar sozinha assim que isso terminar!
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
          title="Inativar Produto"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2Icon className="animate-spin" size={16} />
          ) : (
            <TrashIcon size={16} />
          )}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="border-zinc-800 bg-zinc-900 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            Esta ação vai inativar o produto{" "}
            <strong className="text-white">{productName}</strong>. Ele sumirá da
            vitrine da loja imediatamente, mas o histórico de pedidos antigos
            será preservado.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-none bg-zinc-800 text-white hover:bg-zinc-700">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Sim, inativar produto
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
