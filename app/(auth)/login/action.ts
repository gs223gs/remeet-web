import { signIn } from "@/auth";

export const login = {
  async google() {
    "use server";
    await signIn("google");
  },
  async github() {
    "use server";
    await signIn("github");
  },
};
