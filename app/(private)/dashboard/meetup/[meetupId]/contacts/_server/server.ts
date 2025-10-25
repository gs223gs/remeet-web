"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "@/auth";
import { ContactsDetailResult } from "@/type/private/contacts/contacts";

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
            id: true,
            tag: {
              select: {
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
            tagId: t.id,
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
