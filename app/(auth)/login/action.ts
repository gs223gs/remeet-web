"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import type { ErrorState } from "@/type/auth";

import { signIn } from "@/auth";

export const loginWithGoogle = async (): Promise<ErrorState> => {
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

export const loginWithGithub = async (): Promise<ErrorState> => {
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
