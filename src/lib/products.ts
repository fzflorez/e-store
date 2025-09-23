// src/lib/products.ts
export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  category?: string;
  inStock?: boolean;
};

export type ProductFilters = {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "newest" | "name" | "price" | "rating";
  sortOrder?: "asc" | "desc";
  inStock?: boolean;
};

export function filterProducts(
  products: Product[],
  filters: ProductFilters,
): Product[] {
  let result = [...products];

  // 🔎 Búsqueda
  if (filters.search) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes(filters.search!.toLowerCase()),
    );
  }

  // 📂 Categoría
  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  // 💰 Precio
  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }

  // 📦 Stock
  if (filters.inStock) {
    result = result.filter((p) => p.inStock);
  }

  // 🔃 Ordenamiento
  if (filters.sortBy) {
    result.sort((a, b) => {
      let valA: number | string = "";
      let valB: number | string = "";

      switch (filters.sortBy) {
        case "name":
          valA = a.name;
          valB = b.name;
          break;
        case "price":
          valA = a.price;
          valB = b.price;
          break;
        case "rating":
          valA = a.rating;
          valB = b.rating;
          break;
        case "newest":
        default:
          valA = Number(a.id);
          valB = Number(b.id);
          break;
      }

      if (valA < valB) return filters.sortOrder === "desc" ? 1 : -1;
      if (valA > valB) return filters.sortOrder === "desc" ? -1 : 1;
      return 0;
    });
  }

  return result;
}
