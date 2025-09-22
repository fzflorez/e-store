import { getUser } from "@/src/auth/server";
import { Button } from "@/src/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const user = await getUser();
  const fullName = user?.user_metadata.fullName;
  return (
    <section className="bg-secondary py-20">
      <div className="container mx-auto flex flex-col items-center justify-center gap-8 px-5 text-center">
        <h1 className="text-4xl font-bold md:text-6xl">
          Bienvenido a nuestra tienda
        </h1>
        <p className="text-accent-foreground max-w-2xl text-lg md:text-xl">
          Descubre productos increíbles con los mejores precios y calidad.
          {user
            ? ` Bienvenido, ${fullName}!`
            : "¡Únete hoy y aprovecha ofertas exclusivas!"}
        </p>
        <Button asChild className="text-base md:text-lg">
          <Link href="/products">
            <ShoppingBag />
            Comprar ahora
          </Link>
        </Button>
      </div>
    </section>
  );
}
