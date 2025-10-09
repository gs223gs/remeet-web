"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

export async function authenticate(_: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    redirect("/dashboard");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "mail or pass is invalid.";
        default:
          return "Something went wrong. please try again.";
      }
    }
    throw error;
  }
}
