import type { Result } from "@/type/error/error";
import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const contactsService = {
  async createContact(): Promise<Result<void>> {
    return {
      ok: true,
      data: undefined,
    };
  },
};
