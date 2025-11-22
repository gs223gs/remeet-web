"use server";

import type { Result } from "@/type/error/error";
import type { ContactsDetailResult } from "@/type/private/contacts/contacts";
import type { Tag } from "@/type/private/tags/tags";

import { getUser } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getContactDetail = async (
  contactsId: string,
): Promise<ContactsDetailResult> => {
  const user = await getUser();
  if (!user)
    return {
      ok: false,
      error: {
        code: "unauthenticated",
        message: ["情報取得に失敗しました"],
      },
    };

  try {
    const detail = await prisma.contact.findFirst({
      where: { userId: user.id, id: contactsId },
      select: {
        id: true,
        name: true,
        company: true,
        role: true,
        description: true,
        links: {
          select: {
            id: true,
            type: true,
            url: true,
            handle: true,
          },
        },
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!detail)
      return {
        ok: false,
        error: {
          code: "not_found",
          message: ["そんなのは存在しない"], //TODO あとで整える
        },
      };

    return {
      ok: true,
      data: {
        id: detail.id,
        name: detail.name,
        company: detail.company ?? undefined,
        role: detail.role ?? undefined,
        description: detail.description ?? undefined,
        links: detail.links.map((l) => {
          return {
            id: l.id,
            type: l.type,
            url: l.url,
            handle: l.handle ?? undefined,
          };
        }),
        tags: detail.tags.map((t) => {
          return {
            id: t.tag.id,
            name: t.tag.name,
          };
        }),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: {
        code: "unauthenticated",
        message: ["情報取得に失敗しました"],
      },
    };
  }
};

//TODO リファクタリング 全く同じ関数がある
export const getTags = async (): Promise<Result<Tag[]>> => {
  const user = await getUser();

  if (!user)
    return {
      ok: false,
      error: {
        code: "unauthenticated",
        message: ["情報取得に失敗しました"],
      },
    };

  try {
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
      //TODO ハンドリング考える
      ok: false,
      error: {
        code: "db_error",
        message: [],
      },
    };
  }
};
