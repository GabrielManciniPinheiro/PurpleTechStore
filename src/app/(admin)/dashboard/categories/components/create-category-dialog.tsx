"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CategoryForm from "./category-form";

const CreateCategoryDialog = () => {
  // Esse state controla se a janelinha está aberta ou fechada
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* O DialogTrigger é o botão que abre o modal */}
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          <PlusIcon size={18} />
          Adicionar categoria
        </Button>
      </DialogTrigger>

      {/* O DialogContent é a janelinha em si */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Categoria</DialogTitle>
          <DialogDescription>
            Adicione uma nova categoria e uma imagem para organizar seus
            produtos.
          </DialogDescription>
        </DialogHeader>

        {/* Aqui nós injetamos o seu formulário! 
            Quando ele der sucesso, ele chama o setIsOpen(false) e fecha o modal sozinho. */}
        <CategoryForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
