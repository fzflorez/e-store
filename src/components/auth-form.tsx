"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { loginAction, signUpAction } from "../actions/users";

// 📌 Importamos schemas y defaults
import {
  loginSchema,
  registerSchema,
  loginDefaultValues,
  registerDefaultValues,
} from "../schemas/auth-schema";
import { LoginFormData, RegisterFormData } from "../types";

type Props = {
  type: "login" | "signUp";
};

export const AuthForm = ({ type }: Props) => {
  const isLoginForm = type === "login";
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(isLoginForm ? loginSchema : registerSchema),
    defaultValues: isLoginForm ? loginDefaultValues : registerDefaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: LoginFormData | RegisterFormData) => {
    startTransition(async () => {
      const { fullName, email, password } = data as RegisterFormData;

      let errorMessage;
      let title;
      let description;

      if (isLoginForm) {
        errorMessage = (await loginAction(email, password)).errorMessage;
        title = "Sesión iniciada";
        description = "Has iniciado sesión correctamente";
      } else {
        errorMessage = (await signUpAction(fullName!, email, password))
          .errorMessage;
        title = "Registrado";
        description = "Verifica tu correo electrónico para confirmar tu cuenta";
      }

      if (!errorMessage) {
        toast.success(title, { description });
        if (isLoginForm) {
          router.replace("/");
        } else {
          router.replace("/login");
        }
      } else {
        if (errorMessage.includes("registrado")) {
          toast.error("El correo ya está registrado", {
            description: "Por favor inicia sesión con tu cuenta",
          });
          router.push("/login");
        } else {
          toast.error(errorMessage);
        }
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
      noValidate
    >
      <CardContent>
        <div className="grid w-full items-center gap-4">
          {!isLoginForm && (
            <div className="grid w-full gap-2">
              <Label htmlFor="fullName">Nombre</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Ingrese su nombre"
                disabled={isPending}
                {...register("fullName")}
              />
              {!isLoginForm && (errors as any)?.fullName && (
                <p className="text-sm text-red-500">
                  {(errors as any).fullName?.message}
                </p>
              )}
            </div>
          )}

          <div className="grid w-full gap-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="Ingrese su correo electrónico"
              disabled={isPending}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="grid w-full gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="Ingrese su contraseña"
              disabled={isPending}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
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
