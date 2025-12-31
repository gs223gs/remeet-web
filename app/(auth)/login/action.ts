"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import type { AppError } from "@/type/error/error";

import { signIn } from "@/auth";

export const loginWithGoogle = async (): Promise<{
  ok: false;
  error: AppError;
} | void> => {
  try {
    await signIn("google");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("google OAuth Error", error);

    return {
      ok: false,
      error: {
        code: "unauthenticated",
        message: [],
      },
    };
  }
};

export const loginWithGithub = async (): Promise<{
  ok: false;
  error: AppError;
} | void> => {
  try {
    await signIn("github");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("github OAuth Error", error);
    return {
      ok: false,
      error: {
        code: "unauthenticated",
        message: [],
      },
    };
  }
};
