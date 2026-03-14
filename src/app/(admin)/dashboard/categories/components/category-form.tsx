"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCategory } from "./actions";
import { generateUploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

// Trocamos para o Dropzone (Área de arrastar e soltar muito mais intuitiva)
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

interface CategoryFormProps {
  onSuccess: () => void;
}

const CategoryForm = ({ onSuccess }: CategoryFormProps) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !imageUrl) return;

    setIsLoading(true);
    try {
      await createCategory({
        name,
        slug: generateSlug(name),
        imageUrl,
      });
      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold">Nome da Categoria</label>
        <Input
          placeholder="Ex: Teclados Mecânicos"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold">Imagem da Categoria</label>

        {/* Bloco de Imagem: Ou mostra o Dropzone, ou mostra a foto ocupando o espaço */}
        {imageUrl ? (
          <div className="relative h-56 w-full overflow-hidden rounded-lg border border-dashed border-primary">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Pré-visualização"
              className="h-full w-full object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              className="absolute bottom-4 right-4"
              onClick={() => setImageUrl("")}
            >
              Remover / Trocar
            </Button>
          </div>
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res && res.length > 0) {
                setImageUrl(res[0].url); // Volta o botão roxo na mesma hora
              }
            }}
            onUploadError={(error: Error) => {
              // A ARMADILHA: Se falhar, o erro vai pular na sua cara na tela
              alert(`ERRO REAL DO UPLOADTHING: ${error.message}`);
            }}
          />
        )}
      </div>

      <Button type="submit" disabled={isLoading || !name || !imageUrl}>
        {isLoading ? "A guardar..." : "Criar Categoria"}
      </Button>
    </form>
  );
};

export default CategoryForm;
