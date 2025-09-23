"use client";

import { ProductGrid } from "@/src/components/products/product-grid";
import { ProductFiltersComponent } from "@/src/components/products/products-filters-component";
import { useProducts } from "@/src/hooks/use-products";

const ProductsPage = () => {
  const { filters, setFilters, categories, filteredProducts, clearFilters } =
    useProducts();

  return (
    <section className="pt-24 pb-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 xl:px-0">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold md:text-3xl">Productos</h2>
          <span className="text-muted-foreground text-sm md:text-base">
            Descubra nuestra increíble colección de productos.
          </span>
        </div>

        <div className="space-y-6">
          <ProductFiltersComponent
            categories={categories}
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearFilters}
          />

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              Mostrando {filteredProducts.length} productos
            </p>
          </div>

          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
