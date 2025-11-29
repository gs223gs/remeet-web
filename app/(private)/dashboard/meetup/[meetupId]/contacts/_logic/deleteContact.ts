import type { RepositoryResult } from "@/type/error/error";
import type { ContactsErrors } from "@/type/private/contacts/contacts";

import { prisma } from "@/lib/prisma";

export const contactRepository = {
  async delete(
    contactId: string,
    userId: string,
  ): Promise<RepositoryResult<null, ContactsErrors>> {
    try {
      await prisma.contact.delete({
        where: { id: contactId, userId: userId },
      });

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
