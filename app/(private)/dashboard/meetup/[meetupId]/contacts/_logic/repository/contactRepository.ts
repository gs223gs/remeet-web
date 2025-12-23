import type { MigrationResult, Result } from "@/type/error/error";
import type { ContactsErrors } from "@/type/private/contacts/contacts";

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
  async create(data: AddContacts): Promise<Result<string>> {
    try {
      const createdContact = await prisma.contact.create({
        data,
      });

      return {
        ok: true,
        data: createdContact.id,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: {
          code: "db_error",
          message: ["dbエラーです"],
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
