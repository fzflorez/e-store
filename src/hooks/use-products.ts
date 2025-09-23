import { useState, useMemo } from "react";
import { filterProducts, ProductFilters } from "../lib/products";
import { allProducts } from "../db/feactured-products";

export function useProducts() {
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    category: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: "newest",
    sortOrder: "asc",
    inStock: false,
  });

  const categories = Array.from(
    new Set(allProducts.map((p) => p.category).filter(Boolean)),
  ) as string[];

  const filteredProducts = useMemo(() => {
    return filterProducts(allProducts, filters);
  }, [filters]);

  const clearFilters = () => {
    setFilters({
      search: "",
      category: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      sortBy: "newest",
      sortOrder: "asc",
      inStock: false,
    });
  };

  return {
    filters,
    setFilters,
    categories,
    filteredProducts,
    clearFilters,
  };
}
