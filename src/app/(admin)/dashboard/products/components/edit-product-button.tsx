"use client";

import { Button } from "@/components/ui/button";
import { EditIcon, Loader2Icon, SaveIcon, XIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { updateProduct } from "./action";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

// 👇 Importações nativas do UploadThing
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const EditProductButton = ({ product, categories }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Estados
  const [description, setDescription] = useState(product.description || "");
  const [imageUrls, setImageUrls] = useState<string[]>(product.imageUrls || []);
  const [categoryId, setCategoryId] = useState(
    product.categoryId || "sem_categoria",
  );
  const [isActive, setIsActive] = useState(product.isActive ?? true);

  // Função para remover uma imagem da lista antes de salvar
  const handleRemoveImage = (indexToRemove: number) => {
    setImageUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      await updateProduct({
        id: product.id,
        name: formData.get("name") as string,
        slug: product.slug,
        description: description,
        basePrice: Number(formData.get("basePrice")),
        discountPercentage: Number(formData.get("discountPercentage")),
        categoryId: categoryId === "sem_categoria" ? null : categoryId,
        imageUrls: imageUrls, // 👇 Aqui vai o array de imagens (antigas + novas do UploadThing)
        isActive: isActive,
        supplierUrl: product.supplierUrl || null,
        costPrice: product.costPrice ? Number(product.costPrice) : null,
      });

      setIsOpen(false);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" title="Editar Produto">
          <EditIcon size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto border-zinc-800 bg-zinc-950 text-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="mt-4 flex flex-col gap-6">
          {/* Switch de Ativo/Inativo */}
          <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <Label className="cursor-pointer text-base font-semibold">
              Produto Ativo na Loja
            </Label>
            <Switch checked={isActive} onCheckedChange={setIsActive} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Nome do Produto</Label>
            <Input
              name="name"
              defaultValue={product.name}
              required
              className="border-zinc-800 bg-zinc-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Preço Base (R$)</Label>
              <Input
                name="basePrice"
                type="number"
                step="0.01"
                defaultValue={Number(product.basePrice)}
                required
                className="border-zinc-800 bg-zinc-900"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Desconto (%)</Label>
              <Input
                name="discountPercentage"
                type="number"
                defaultValue={product.discountPercentage}
                required
                className="border-zinc-800 bg-zinc-900"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Categoria</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="border-zinc-800 bg-zinc-900">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent className="border-zinc-800 bg-zinc-900 text-white">
                <SelectItem value="sem_categoria">Sem Categoria</SelectItem>
                {categories?.map((cat: any) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Descrição</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="min-h-[100px] border-zinc-800 bg-zinc-900"
            />
          </div>

          {/* 👇 GERENCIADOR DE IMAGENS COM UPLOADTHING 👇 */}
          <div className="flex flex-col gap-3 rounded-lg border border-zinc-800 bg-zinc-900/30 p-4">
            <Label className="font-semibold text-zinc-300">
              Imagens do Produto
            </Label>

            {/* 1. Galeria de Imagens Atuais */}
            {imageUrls.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-3">
                {imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative h-[80px] w-[80px] overflow-hidden rounded-md border border-zinc-700 bg-zinc-950"
                  >
                    <Image
                      src={url}
                      alt={`Imagem ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute right-1 top-1 rounded-full bg-red-600/90 p-1 text-white transition-colors hover:bg-red-600"
                      title="Remover imagem"
                    >
                      <XIcon size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 2. Área de Upload de Novas Imagens */}
            <UploadDropzone<OurFileRouter, "imageUploader">
              endpoint="imageUploader" // ⚠️ ATENÇÃO: Verifique se o nome do seu endpoint no core.ts é esse mesmo!
              onClientUploadComplete={(res) => {
                // Pega as URLs das imagens que acabaram de subir e adiciona na lista
                if (res) {
                  setImageUrls((prev) => [
                    ...prev,
                    ...res.map((file) => file.url),
                  ]);
                }
              }}
              onUploadError={(error: Error) => {
                alert(`Erro ao subir a imagem: ${error.message}`);
              }}
              appearance={{
                container: "border-zinc-800 bg-zinc-950 p-4",
                label: "text-zinc-400 hover:text-primary transition-colors",
                button:
                  "bg-primary text-white hover:bg-primary/90 ut-readying:bg-primary/50",
                allowedContent: "text-zinc-500",
              }}
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="mt-2 w-full bg-primary font-bold hover:bg-primary/90"
          >
            {isPending ? (
              <Loader2Icon className="mr-2 animate-spin" size={16} />
            ) : (
              <SaveIcon className="mr-2" size={16} />
            )}
            {isPending ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
