import { getUser } from "@/src/auth/server";
import { Button } from "@/src/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const user = await getUser();

  return (
    <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-20 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold text-balance md:text-6xl">
          Bienvenido a nuestra tienda
        </h1>
        <p className="max-w-3xl text-xl">
          Descubre productos increíbles con los mejores precios y calidad.
          ¡Únete hoy y aprovecha ofertas exclusivas!
          {user ? `Bienvenido, ${user.email}` : "Desconocido"}
        </p>
        <Button asChild className="text-lg">
          <Link href="/products">
            <ShoppingBag />
            Comprar ahora
          </Link>
        </Button>
      </div>
    </section>
  );
}
