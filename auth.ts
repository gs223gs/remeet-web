import NextAuth from "next-auth";

import { authConfig } from "./auth.config";

import Credentials from "next-auth/providers/credentials";

import { z } from "zod";

import { prisma } from "@/lib/prisma";

import bcrypt from "bcrypt";

type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

async function getUser(email: string): Promise<User | undefined> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return undefined;

  return user;
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.email(),
            password: z.string().min(8),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);

          if (!user) return null;

          //TODO 調査 OAuth 実装と
          if (!user.passwordHash) return null;
          const passwordMatch = await bcrypt.compare(
            password,
            user.passwordHash,
          );

          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id || token.sub || "") as string;
        session.user.name = token.name ?? "";
        session.user.email = token.email ?? "";
      }
      return session;
    },
  },
});
