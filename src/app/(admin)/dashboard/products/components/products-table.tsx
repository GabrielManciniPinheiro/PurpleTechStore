import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductWithTotalPrice } from "@/helpers/product";
import { EditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteProductButton } from "./delete-product-button";

// 👇 Ajuste 1: Avisando o TypeScript que a categoria pode ser nula (produtos órfãos)
export type ProductWithTotalPriceAndCategory = ProductWithTotalPrice & {
  category: {
    name: string;
  } | null;
};

interface ProductsTableProps {
  products: ProductWithTotalPriceAndCategory[];
}

const ProductsTable = ({ products }: ProductsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Preço total</TableHead>
          <TableHead>Preço base</TableHead>
          <TableHead>Vendidos</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>

            {/* 👇 Ajuste 2: Se a categoria existir mostra o nome, senão mostra "Sem Categoria" */}
            <TableCell>{product.category?.name || "Sem Categoria"}</TableCell>

            <TableCell>R$ {product.totalPrice.toFixed(2)}</TableCell>

            <TableCell>R$ {Number(product.basePrice).toFixed(2)}</TableCell>

            <TableCell>0</TableCell>

            <TableCell className="flex gap-2">
              <Button variant="outline" size="icon" title="Editar Produto">
                <EditIcon size={16} />
              </Button>

              <DeleteProductButton
                productId={product.id}
                productName={product.name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
