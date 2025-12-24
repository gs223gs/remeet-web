import type { Result } from "@/type/error/error";
import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const contactsService = {
  async createContact(): Promise<Result<void>> {
    try {
      return {
        ok: true,
        data: undefined,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: {
          code: "unknown",
          message: ["不明なエラーÏ"],
        },
      };
    }
  },
};
