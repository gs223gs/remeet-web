import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  session: { strategy: "jwt" },
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
