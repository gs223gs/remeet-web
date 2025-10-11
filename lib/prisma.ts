import { PrismaClient } from "@prisma/client";
const glovalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = glovalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") glovalForPrisma.prisma = prisma;
