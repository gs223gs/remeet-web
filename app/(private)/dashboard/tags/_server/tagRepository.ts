import type { Result } from "@/type/error/error";
import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const tagRepository = {
  async createContactTag(
    tx: Prisma.TransactionClient,
    addContactTag: {
      contactId: string;
      tagId: string;
    }[],
  ): Promise<Result<void>> {
    try {
      await tx.contactTag.createMany({
        data: addContactTag,
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
          message: ["prismaでerror発生"],
        },
      };
    }
  },
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
            message: ["formにtagsが追加されていない"],
          },
        };
      }

      if (!userId) {
        return {
          ok: false,
          error: {
            code: "unauthenticated",
            message: ["userIdがない"],
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
            message: ["tagsの権限不足"],
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
          message: ["prismaでerror発生"],
        },
      };
    }
  },
};
