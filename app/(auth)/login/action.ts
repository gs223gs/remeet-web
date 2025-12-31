"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import type { Result } from "@/type/error/error";

import { signIn } from "@/auth";

export const loginWithGoogle = async (): Promise<Result<void>> => {
  try {
    await signIn("google");
    return {
      ok: true,
      data: undefined,
    };
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

export const loginWithGithub = async (): Promise<Result<void>> => {
  try {
    await signIn("github");
    return {
      ok: true,
      data: undefined,
    };
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
