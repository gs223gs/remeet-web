import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/lib/prisma";

// eslint-disable-next-line no-console
console.log("[auth env check]", {
  HAS_DATABASE_URL: !!process.env.DATABASE_URL,
  HAS_AUTH_GITHUB_ID: !!process.env.AUTH_GITHUB_ID,
  HAS_AUTH_GITHUB_SECRET: !!process.env.AUTH_GITHUB_SECRET,
  HAS_GOOGLE_ID: !!process.env.GOOGLE_CLIENT_ID,
  HAS_GOOGLE_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
  HAS_AUTH_SECRET: !!process.env.AUTH_SECRET,
  HAS_NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  debug: true,
  logger: {
    error(code, ...message) {
      console.error(
        "[nextauth][error]",
        code,
        JSON.stringify(message, null, 2),
      );
    },
  },
});

export const getUser = async () => {
  const session = await auth();

  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email },
  });

  if (!user) return null;

  return user;
};
