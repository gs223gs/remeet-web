"use server";

import type { Result } from "@/type/error/error";
import type { ContactsDetailDTO } from "@/type/private/contacts/contacts";
import type { MeetupDetail } from "@/type/private/meetup/meetup";
import type { Tag } from "@/type/private/tags/tags";

import { getUser } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getContactsByTag = async (
  tagId: string,
): Promise<Result<(ContactsDetailDTO & { meetup: MeetupDetail })[]>> => {
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
    const contactsByTag = await prisma.tag.findUnique({
      where: { id: tagId, userId: user.id },
      select: {
        contacts: {
          select: {
            contact: {
              select: {
                id: true,
                name: true,
                role: true,
                company: true,
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
                meetup: {
                  select: {
                    id: true,
                    name: true,
                    scheduledAt: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!contactsByTag) {
      return {
        ok: true,
        data: [],
      };
    }

    const resultContactsByTag = contactsByTag.contacts.map(({ contact }) => {
      const contactTags = contact.tags.map((t) => {
        return { ...t.tag };
      });

      const contactLinks = contact.links.map((l) => {
        return {
          ...l,
          handle: l.handle ?? undefined,
        };
      });

      return {
        id: contact.id,
        name: contact.name,
        company: contact.company ?? undefined,
        role: contact.role ?? undefined,
        tags: contactTags ?? undefined,
        meetup: contact.meetup,
        links: contactLinks ?? undefined,
      };
    });

    return {
      ok: true,
      data: resultContactsByTag,
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

export const getTag = async (tagId: string): Promise<Result<Tag>> => {
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

    const tag = await prisma.tag.findFirst({
      where: { id: tagId, userId: user.id },
      select: {
        id: true,
        name: true,
      },
    });

    if (!tag) {
      return {
        ok: false,
        error: {
          code: "db_error",
          message: ["tagが存在しないかエラーです"],
        },
      };
    }
    return {
      ok: true,
      data: tag,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: {
        code: "unknown",
        message: ["不明なエラーです"],
      },
    };
  }
};
