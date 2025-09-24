"use client";

import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { formatCurrency } from "@/src/lib/utils";
import { allProducts } from "@/src/db/feactured-products";

const ProductDetailPage = () => {
  const { id } = useParams();

  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const discountPercentage =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  const handleAddToCart = () => {
    console.log("Añadiendo producto:", product.name);
  };

  return (
    <section className="pt-24 pb-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 xl:px-0">
        <Link
          href="/products"
          className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Productos
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              {discountPercentage > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                  -{discountPercentage}%
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="secondary" className="absolute top-4 right-4">
                  Out of Stock
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">
                  {product.rating} ({product.reviewCount} reseñas)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-muted-foreground text-xl line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{product.category}</Badge>
            </div>

            <Card>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Stock:</span>
                <span
                  className={
                    product.inStock ? "text-green-600" : "text-red-600"
                  }
                >
                  {product.inStock
                    ? `${product.stockQuantity} Disponible`
                    : "Agotado"}
                </span>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                size="lg"
                className={`w-full ${product.inStock ? "cursor-pointer" : "cursor-none"}`}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.inStock ? "Añadir al Carrito" : "Agotado"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
