"use server";

import type { Result } from "@/type/error/error";

import { tagRepository } from "@/app/(private)/dashboard/tags/_server/tagRepository";

export const updateTagService = async (
  tagId: string,
  userId: string,
  name: string,
): Promise<Result<void>> => {
  if (!userId) {
    return {
      ok: false,
      error: {
        code: "validation",
      },
    };
  }

  const updateResult = await tagRepository.updateTag(tagId, userId, name);
  if (!updateResult.ok) {
    return {
      ok: false,
      error: {
        code: "db_error",
      },
    };
  }

  if (updateResult.data === 0) {
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
};
