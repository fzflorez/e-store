import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";
import { featuredProducts } from "../db/feactured-products";
import { formatCurrency } from "../lib/utils";

export const FeacturedProductsSection = () => {
  return (
    <section className="py-20">
      <div className="text-center">
        <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Productos Destacados
          </h2>
          <span className="text-muted-foreground text-base md:text-lg">
            Vea nuestros artículos más populares, cuidadosamente seleccionados
            por su calidad y valor.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3">
        {featuredProducts.map((product) => (
          <Card
            key={product.id}
            className="group transition-shadow hover:shadow-lg"
          >
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
              {product.originalPrice && (
                <Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>
              )}
            </div>
            <CardContent className="p-6">
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
                  {product.rating}
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
                <Link href={`/products/${product.id}`}>Ver detalles</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex w-full justify-center pt-10">
        <Button asChild className="text-base">
          <Link href="/products">Ver Más Productos</Link>
        </Button>
      </div>
    </section>
  );
};
