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
  } catch (error) {
    return { errorMessage: "Ha ocurrido un error, porfavor intenta de nuevo." };
  }
};

export const logOutAction = async () => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: "Ha ocurrido un error, porfavor intenta de nuevo." };
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

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return {
      errorMessage: "Ha ocurrido un error, por favor intenta de nuevo.",
    };
  }
};
