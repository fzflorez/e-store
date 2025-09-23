"use server";

import { createClient } from "../auth/server";

export const loginAction = async (email: string, password: string) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    return { errorMessage: null };
  } catch (error: any) {
    return {
      errorMessage:
        error?.message || "Ha ocurrido un error, por favor intenta de nuevo.",
    };
  }
};

export const logOutAction = async () => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    return { errorMessage: null };
  } catch (error: any) {
    return {
      errorMessage:
        error?.message || "Ha ocurrido un error, por favor intenta de nuevo.",
    };
  }
};

export const signUpAction = async (
  fullName: string,
  email: string,
  password: string,
) => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { fullName },
      },
    });

    console.log(
      "📩 Respuesta de Supabase signUp:",
      JSON.stringify(data, null, 2),
    );

    if (error) {
      return { errorMessage: error.message };
    }

    // 🚨 Caso especial: usuario ya existe
    if (
      data.user &&
      Array.isArray(data.user.identities) &&
      data.user.identities.length === 0
    ) {
      return { errorMessage: "Este correo ya está registrado" };
    }

    return { errorMessage: null };
  } catch (error: any) {
    return {
      errorMessage:
        error?.message || "Ha ocurrido un error, por favor intenta de nuevo.",
    };
  }
};
