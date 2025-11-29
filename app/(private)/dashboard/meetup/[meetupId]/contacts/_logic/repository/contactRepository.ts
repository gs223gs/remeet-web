import type { RepositoryResult } from "@/type/error/error";
import type { ContactsErrors } from "@/type/private/contacts/contacts";

import { prisma } from "@/lib/prisma";

export const contactRepository = {
  async delete(
    contactId: string,
    userId: string,
  ): Promise<RepositoryResult<null, ContactsErrors>> {
    try {
      const isDeleted = await prisma.contact.deleteMany({
        where: { id: contactId, userId: userId },
      });

      if (isDeleted.count === 0) {
        return {
          ok: false,
          error: {
            server: "server error",
          },
        };
      }

      return {
        ok: true,
        data: null,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: {
          server: "server error",
        },
      };
    }
  },
};
