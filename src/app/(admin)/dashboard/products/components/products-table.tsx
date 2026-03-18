import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductWithTotalPrice } from "@/helpers/product";
import { DeleteProductButton } from "./delete-product-button";
import { EditProductButton } from "./edit-product-button"; // 👇 O nosso botão!

// 👇 Avisando o TypeScript todos os campos que existem no produto
export type ProductWithTotalPriceAndCategory = ProductWithTotalPrice & {
  category: {
    name: string;
  } | null;
  description: string;
  imageUrls: string[];
  categoryId: string | null;
  isActive: boolean;
  supplierUrl: string | null;
  costPrice: any;
};

interface ProductsTableProps {
  products: ProductWithTotalPriceAndCategory[];
  categories: any[]; // 👇 A tabela agora recebe as categorias para repassar ao botão
}

const ProductsTable = ({ products, categories }: ProductsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Preço total</TableHead>
          <TableHead>Preço base</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>

            <TableCell>{product.category?.name || "Sem Categoria"}</TableCell>

            <TableCell>R$ {product.totalPrice.toFixed(2)}</TableCell>

            <TableCell>R$ {Number(product.basePrice).toFixed(2)}</TableCell>

            <TableCell>
              {product.isActive ? (
                <span className="text-xs font-bold text-emerald-500">
                  Ativo
                </span>
              ) : (
                <span className="text-xs font-bold text-red-500">Inativo</span>
              )}
            </TableCell>

            <TableCell className="flex gap-2">
              {/* 👇 O Botão de Editar recebendo tudo redondinho */}
              <EditProductButton product={product} categories={categories} />

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
