import type { MigrationResult } from "@/type/error/error";
import type {
  ContactOwnershipDTO,
  ContactsErrors,
} from "@/type/private/contacts/contacts";

import { prisma } from "@/lib/prisma";

export const getOwnedContact = async (
  contactId: string,
  userId: string,
): Promise<MigrationResult<ContactOwnershipDTO, ContactsErrors>> => {
  try {
    const contactOwned = await prisma.contact.findFirst({
      where: { id: contactId, userId: userId },
      select: { id: true, userId: true },
    });

    if (!contactOwned) {
      return {
        ok: false,
        error: {
          auth: "認証に失敗しました",
        },
      };
    }
    return {
      ok: true,
      data: {
        contactId: contactOwned.id,
        userId: contactOwned.userId,
      },
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
};
