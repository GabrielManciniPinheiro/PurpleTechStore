"use client";

import { Button } from "@/components/ui/button";
import { EditIcon, Loader2Icon, SaveIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { updateProduct } from "./action";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

// Tipagem simplificada baseada no que vem da tabela
interface EditProductButtonProps {
  product: any;
}

export const EditProductButton = ({ product }: EditProductButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Função que captura os dados do formulário e manda para o banco
  const handleAction = (formData: FormData) => {
    startTransition(async () => {
      await updateProduct({
        id: product.id,
        name: formData.get("name") as string,
        slug: product.slug, // Mantemos o slug original para não quebrar links
        description: product.description, // Mantemos a descrição original
        basePrice: Number(formData.get("basePrice")),
        discountPercentage: Number(formData.get("discountPercentage")),
        categoryId: product.categoryId,
        imageUrls: product.imageUrls,
        supplierUrl: product.supplierUrl,
        costPrice: product.costPrice ? Number(product.costPrice) : undefined,
      });

      setIsOpen(false); // Fecha a aba lateral quando terminar de salvar
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" title="Editar Produto">
          <EditIcon size={16} />
        </Button>
      </SheetTrigger>

      <SheetContent className="border-zinc-800 bg-zinc-950 text-white sm:max-w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-white">Editar Produto</SheetTitle>
        </SheetHeader>

        <form action={handleAction} className="mt-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-zinc-300">
              Nome do Produto
            </label>
            <Input
              name="name"
              defaultValue={product.name}
              required
              className="border-zinc-700 bg-zinc-900 focus-visible:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-zinc-300">
              Preço Base (R$)
            </label>
            <Input
              name="basePrice"
              type="number"
              step="0.01" // Permite centavos
              defaultValue={Number(product.basePrice)}
              required
              className="border-zinc-700 bg-zinc-900 focus-visible:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-zinc-300">
              Desconto (%)
            </label>
            <Input
              name="discountPercentage"
              type="number"
              defaultValue={product.discountPercentage}
              required
              className="border-zinc-700 bg-zinc-900 focus-visible:ring-primary"
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="mt-4 w-full gap-2 bg-primary font-bold hover:bg-primary/90"
          >
            {isPending ? (
              <Loader2Icon className="animate-spin" size={16} />
            ) : (
              <SaveIcon size={16} />
            )}
            {isPending ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};
