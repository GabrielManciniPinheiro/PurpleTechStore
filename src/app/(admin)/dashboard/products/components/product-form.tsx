"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProduct } from "./action";
import { generateUploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

const UploadDropzone = generateUploadDropzone<OurFileRouter>();

interface ProductFormProps {
  categories: { id: string; name: string }[]; // Recebe as categorias para o Select
  onSuccess: () => void;
}

const ProductForm = ({ categories, onSuccess }: ProductFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("0");
  const [categoryId, setCategoryId] = useState("");

  // Campos de Dropshipping
  const [supplierUrl, setSupplierUrl] = useState("");
  const [costPrice, setCostPrice] = useState("");

  // Array para controlar as 4 imagens separadamente
  const [images, setImages] = useState<string[]>(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleImageUpload = (index: number, url: string) => {
    const newImages = [...images];
    newImages[index] = url;
    setImages(newImages);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = "";
    setImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Filtra as imagens vazias, mantendo apenas as que foram feito upload
    const filledImages = images.filter((img) => img !== "");

    if (!name || !basePrice || !categoryId || filledImages.length === 0) return;

    setIsLoading(true);
    try {
      await createProduct({
        name,
        slug: generateSlug(name),
        description,
        basePrice: Number(basePrice),
        discountPercentage: Number(discountPercentage),
        categoryId,
        imageUrls: filledImages,
        supplierUrl: supplierUrl || undefined,
        costPrice: costPrice ? Number(costPrice) : undefined,
      });
      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar no banco.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex w-full flex-col gap-2">
          <label className="text-sm font-bold">Nome do Produto *</label>
          <Input
            placeholder="Ex: Gabinete Gamer RGB"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label className="text-sm font-bold">Categoria *</label>
          <Select onValueChange={setCategoryId} required>
            <SelectTrigger>
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold">Descrição *</label>
        <Textarea
          placeholder="Detalhes do produto..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="flex gap-4">
        <div className="flex w-full flex-col gap-2">
          <label className="text-sm font-bold">Preço de Venda (R$) *</label>
          <Input
            type="number"
            step="0.01"
            placeholder="299.90"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            required
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label className="text-sm font-bold">Desconto (%)</label>
          <Input
            type="number"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-4 rounded-lg border bg-secondary/20 p-4">
        <div className="flex w-full flex-col gap-2">
          <label className="text-sm font-bold text-muted-foreground">
            Custo Fornecedor (R$)
          </label>
          <Input
            type="number"
            step="0.01"
            placeholder="150.00"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label className="text-sm font-bold text-muted-foreground">
            Link Fornecedor (AliExpress, etc)
          </label>
          <Input
            placeholder="https://..."
            value={supplierUrl}
            onChange={(e) => setSupplierUrl(e.target.value)}
          />
        </div>
      </div>

      <label className="mt-2 text-sm font-bold">
        Imagens do Produto (Mínimo 1) *
      </label>
      <div className="grid grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="flex flex-col gap-2">
            {images[index] ? (
              <div className="relative h-32 w-full overflow-hidden rounded-lg border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[index]}
                  alt={`Img ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute bottom-2 right-2 h-6 text-xs"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </Button>
              </div>
            ) : (
              <div className="h-32">
                <UploadDropzone
                  endpoint="imageUploader"
                  config={{ mode: "auto" }}
                  onClientUploadComplete={(res) => {
                    if (res && res.length > 0) {
                      const linkValido = res[0].appUrl || res[0].url;
                      handleImageUpload(index, linkValido);
                    }
                  }}
                  onUploadError={(error: Error) =>
                    alert(`Erro: ${error.message}`)
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <Button
        type="submit"
        className="mt-4"
        disabled={
          isLoading ||
          !name ||
          !basePrice ||
          !categoryId ||
          images.filter((i) => i !== "").length === 0
        }
      >
        {isLoading ? "Salvando..." : "Cadastrar Produto"}
      </Button>
    </form>
  );
};

export default ProductForm;
