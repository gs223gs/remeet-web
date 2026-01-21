import type { Result } from "@/type/error/error";
import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type ContactsInput = {
  meetupId: string;
  userId: string;
  name: string;
  company?: string;
  role?: string;
  description?: string;
};
export const contactRepository = {
  async create(
    tx: Prisma.TransactionClient,
    data: ContactsInput,
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
        },
      };
    }
  },

  async update(
    tx: Prisma.TransactionClient,
    contactId: string,
    data: ContactsInput,
  ): Promise<Result<string>> {
    try {
      const updatedContact = await tx.contact.update({
        where: { id: contactId, userId: data.userId },
        data,
      });

      return {
        ok: true,
        data: updatedContact.id, //transaction内でidを使うためidだけreturn
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: {
          code: "db_error",
        },
      };
    }
  },
  async delete(contactId: string, userId: string): Promise<Result<void>> {
    try {
      const isDeleted = await prisma.contact.deleteMany({
        where: { id: contactId, userId: userId },
      });

      if (isDeleted.count === 0) {
        return {
          ok: false,
          error: {
            code: "not_found",
          },
        };
      }

      return {
        ok: true,
        data: undefined,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: {
          code: "db_error",
        },
      };
    }
  },
};
