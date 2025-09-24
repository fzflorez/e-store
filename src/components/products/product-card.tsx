"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { ChevronRight, Star } from "lucide-react";
import { Product } from "@/src/types";
import { formatCurrency } from "@/src/lib/utils";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <Card key={product.id} className="group transition-shadow hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1024px) 50vw,
                 33vw"
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
        {!product.inStock && (
          <Badge variant="secondary" className="absolute top-4 right-4">
            Agotado
          </Badge>
        )}
      </div>

      <CardContent className="px-5">
        <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>

        <div className="mb-3 flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-muted-foreground text-sm">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <span className="text-xl font-bold">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-muted-foreground text-sm line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        <Button asChild className="w-full">
          <Link href={`/products/${product.id}`}>
            Ver Detalles
            <ChevronRight />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
