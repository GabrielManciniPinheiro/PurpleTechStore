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
import { DeleteProductButton } from "./delete-product-button"; // 👇 Importando nosso novo botão!

export type ProductWithTotalPriceAndCategory = ProductWithTotalPrice & {
  category: {
    name: string;
  };
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
          <TableHead>Ações</TableHead> {/* 👇 Nova coluna adicionada */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>

            <TableCell>{(product as any).category.name}</TableCell>

            <TableCell>R$ {product.totalPrice.toFixed(2)}</TableCell>

            <TableCell>R$ {Number(product.basePrice).toFixed(2)}</TableCell>

            <TableCell>0</TableCell>

            {/* 👇 Célula de Ações com os botões */}
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
