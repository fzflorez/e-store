"use client";

import { useTransition } from "react";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { loginAction, signUpAction } from "../actions/users";

type Props = {
  type: "login" | "signUp";
};

export const AuthForm = ({ type }: Props) => {
  const isLoginForm = type === "login";
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const fullName = !isLoginForm ? (formData.get("fullName") as string) : "";
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      let errorMessage;
      let title;
      let description;
      if (isLoginForm) {
        errorMessage = (await loginAction(email, password)).errorMessage;
        title = "Sesión iniciada";
        description = "Has iniciado sesión correctamente";
      } else {
        errorMessage = (await signUpAction(fullName, email, password))
          .errorMessage;
        title = "Registrado";
        description = "Verifica tu correo electrónico para confirmar tu cuenta";
      }

      if (!errorMessage) {
        toast.success(title, { description });
        router.replace("/");
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-6">
      <CardContent>
        <div className="grid w-full items-center gap-4">
          {!isLoginForm && (
            <div className="grid w-full gap-2">
              <Label htmlFor="fullName">Nombre</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Ingrese su nombre"
                required
                disabled={isPending}
              />
            </div>
          )}

          <div className="grid w-full gap-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Ingrese su correo electrónico"
              required
              disabled={isPending}
            />
          </div>

          <div className="grid w-full gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Ingrese su contraseña"
              required
              disabled={isPending}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center gap-4">
        <Button className="w-full cursor-pointer" disabled={isPending}>
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Iniciar Sesión"
          ) : (
            "Registrarse"
          )}
        </Button>
        <p className="text-sm">
          {isLoginForm
            ? "¿Aún no tienes una cuenta?"
            : "¿Ya tienes una cuenta?"}{" "}
          <Link
            href={isLoginForm ? "/sign-up" : "/login"}
            className="text-blue-500 underline"
          >
            {isLoginForm ? "Regístrate" : "Inicia sesión"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};
