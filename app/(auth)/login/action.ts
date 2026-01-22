"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import type { ErrorState } from "@/type/auth";

import { signIn } from "@/auth";

type OAuthProvider = "google" | "github";

const loginWithOAuth = async (provider: OAuthProvider): Promise<ErrorState> => {
  try {
    await signIn(provider);
    return undefined;
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(`${provider} OAuth Error`, error);

    return {
      ok: false,
      error: {
        code: "unauthenticated",
      },
    };
  }
};

export const loginWithGoogle = async (): Promise<ErrorState> => {
  return loginWithOAuth("google");
};

export const loginWithGithub = async (): Promise<ErrorState> => {
  return loginWithOAuth("github");
};
