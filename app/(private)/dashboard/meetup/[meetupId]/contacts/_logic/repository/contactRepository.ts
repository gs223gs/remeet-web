import type { MigrationResult, Result } from "@/type/error/error";
import type { ContactsErrors } from "@/type/private/contacts/contacts";
import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type AddContacts = {
  meetupId: string;
  userId: string;
  name: string;
  company: string | undefined;
  role: string | undefined;
  description: string | undefined;
};
export const contactRepository = {
  async create(
    tx: Prisma.TransactionClient,
    data: AddContacts,
  ): Promise<Result<string>> {
    try {
      const createdContact = await tx.contact.create({
        data,
      });

      return {
        ok: true,
        data: createdContact.id, //transaction内でidを使うためidだけreturn
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: {
          code: "db_error",
          message: ["prismaでerror発生"],
        },
      };
    }
  },
  async delete(
    contactId: string,
    userId: string,
  ): Promise<MigrationResult<null, ContactsErrors>> {
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
