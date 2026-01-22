import type { Result } from "@/type/error/error";
import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const tagRepository = {
  async updateTag(
    tagId: string,
    userId: string,
    name: string,
  ): Promise<Result<number>> {
    try {
      const result = await prisma.tag.updateMany({
        where: { id: tagId, userId },
        data: { name },
      });
      return {
        ok: true,
        data: result.count,
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

  async deleteTag(tagId: string, userId: string): Promise<Result<number>> {
    try {
      const result = await prisma.tag.deleteMany({
        where: { id: tagId, userId },
      });
      return {
        ok: true,
        data: result.count,
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

  async createContactTag(
    tx: Prisma.TransactionClient,
    contactId: string,
    tagIds: string[],
  ): Promise<Result<void>> {
    try {
      await tx.contactTag.createMany({
        //serviceで呼び出す時にシンプルになるためrepositoryで組み立て
        data: tagIds.map((tagId) => ({ tagId, contactId })),
      });
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
  async deleteContactTagByContactId(
    tx: Prisma.TransactionClient,
    contactId: string,
  ): Promise<Result<void>> {
    try {
      await tx.contactTag.deleteMany({
        where: { contactId },
      });
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

  //TODO validationをやめる => service で行うため
  async validateOwnedTagsExistence(
    userId: string,
    tagsField: string[],
  ): Promise<Result<void>> {
    try {
      if (!tagsField.length) {
        return {
          ok: false,
          error: {
            code: "validation",
          },
        };
      }

      if (!userId) {
        return {
          ok: false,
          error: {
            code: "unauthenticated",
          },
        };
      }

      //id重複を削除
      const uniqueIds = [...new Set(tagsField)];

      const searchUserTags = await prisma.tag.findMany({
        where: {
          userId,
          id: {
            in: uniqueIds,
          },
        },
        select: {
          id: true,
          name: true,
        },
      });

      //Inのタグの数と Outのタグの数を検証して認可チェック
      if (searchUserTags.length !== uniqueIds.length) {
        return {
          ok: false,
          error: {
            code: "authorization",
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
