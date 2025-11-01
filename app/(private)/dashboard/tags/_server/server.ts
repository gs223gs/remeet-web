"use server";

import type { Result } from "@/type/error/error";
import type { Tag } from "@/type/private/tags/tags";

import { getUser } from "@/auth";
import { prisma } from "@/lib/prisma";

//TODO リファクタリング 全く同じ関数がある
export const getTags = async (): Promise<Result<Tag[]>> => {
  //とりあえず全タグ取得
  try {
    const user = await getUser();
    if (!user)
      return {
        ok: false,
        error: {
          code: "unauthenticated",
          message: ["情報取得に失敗しました"],
        },
      };

    const tags = await prisma.tag.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        name: true,
      },
    });

    return {
      ok: true,
      data: tags,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: {
        code: "unknown",
        message: ["予期せぬエラー"],
      },
    };
  }
};
