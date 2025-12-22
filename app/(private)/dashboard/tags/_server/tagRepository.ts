import type { Result } from "@/type/error/error";
import type { Tag } from "@/type/private/tags/tags";

import { prisma } from "@/lib/prisma";

export const tagRepository = {
  async validateOwnedTagsExistence(
    userId: string,
    tagsField: string[],
  ): Promise<Result<Tag[]>> {
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

      if (!userId || userId.length === 0) {
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
          userId: userId,
          id: {
            in: uniqueIds,
          },
        },
        select: {
          id: true,
          name: true,
        },
      });

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
        data: searchUserTags,
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
