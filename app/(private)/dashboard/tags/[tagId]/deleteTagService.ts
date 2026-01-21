import type { Result } from "@/type/error/error";

import { tagRepository } from "@/app/(private)/dashboard/tags/_server/tagRepository";

export const deleteTagService = async (
  tagId: string,
  userId: string,
): Promise<Result<void>> => {
  if (!userId) {
    return {
      ok: false,
      error: {
        code: "validation",
      },
    };
  }

  const deleteResult = await tagRepository.deleteTag(tagId, userId);
  if (!deleteResult.ok) {
    return {
      ok: false,
      error: {
        code: "db_error",
      },
    };
  }

  if (deleteResult.data === 0) {
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
