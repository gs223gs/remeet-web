"use server";

import type { Result } from "@/type/error/error";
import type { Tag } from "@/type/private/tags/tags";

import { getUser } from "@/auth";
import { prisma } from "@/lib/prisma";

//TODO リファクタリング 全く同じ関数がある
export const getTagsWithRanking = async (): Promise<
  Result<(Tag & { count: number })[]>
> => {
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
        _count: {
          select: {
            contacts: true,
          },
        },
      },
    });

    return {
      ok: true,
      data: tags.map((t) => {
        return {
          id: t.id,
          name: t.name,
          count: t._count.contacts,
        };
      }),
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
