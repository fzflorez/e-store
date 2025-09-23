import z from "zod";
import { loginSchema, registerSchema } from "../schemas/auth-schema";

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

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
