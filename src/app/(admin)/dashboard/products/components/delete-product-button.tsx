"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon, Loader2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTransition, useState } from "react";
import { deleteProduct } from "./action";

interface DeleteProductButtonProps {
  productId: string;
  productName: string;
}

export const DeleteProductButton = ({
  productId,
  productName,
}: DeleteProductButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleConfirmDelete = () => {
    startTransition(async () => {
      // Aqui garantimos que ele só manda o ID isolado deste componente
      await deleteProduct(productId);
      setIsOpen(false);
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon" title="Inativar Produto">
          <TrashIcon
            size={16}
            className="text-red-500 transition-colors hover:text-red-600"
          />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="border-zinc-800 bg-zinc-950 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            Isso irá inativar o produto{" "}
            <strong className="text-white">{productName}</strong>. Ele deixará
            de aparecer na loja imediatamente, mas continuará no seu banco de
            dados.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            className="border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800"
          >
            Cancelar
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={isPending}
            className="gap-2 font-bold"
          >
            {isPending ? (
              <Loader2Icon className="animate-spin" size={16} />
            ) : (
              <TrashIcon size={16} />
            )}
            {isPending ? "Inativando..." : "Sim, Inativar Produto"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
