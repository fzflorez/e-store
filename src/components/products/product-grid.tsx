import { Product } from "@/src/types";
import { ProductCard } from "./product-card";

type Props = {
  products: Product[];
};

export const ProductGrid = ({ products }: Props) => {
  if (!products.length) {
    return (
      <p className="text-muted-foreground">No se encontraron productos.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
