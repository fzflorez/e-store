import { Button } from "@/src/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-secondary flex flex-col items-center justify-center gap-8 p-20 text-center">
      <h1 className="text-6xl font-bold">Bienvenido a nuestra tienda</h1>
      <p className="max-w-3xl text-xl">
        Descubre productos increíbles con los mejores precios y calidad. ¡Únete
        hoy y aprovecha ofertas exclusivas!
      </p>
      <Button asChild className="text-lg">
        <Link href="/products">
          <ShoppingBag />
          Comprar ahora
        </Link>
      </Button>
    </section>
  );
}
