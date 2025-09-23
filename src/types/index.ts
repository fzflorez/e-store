export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount?: number;
  category?: string;
  inStock?: boolean;
  stockQuantity?: number;
};
