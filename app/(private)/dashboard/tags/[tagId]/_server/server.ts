"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "@/auth";

import { Result } from "@/type/error/error";
import {
  ContactLink,
  ContactsDetailDTO,
} from "@/type/private/contacts/contacts";
import { MeetupDetail } from "@/type/private/meetup/meetup";
import { Tag } from "@/type/private/tags/tags";

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
                meetups: {
                  select: {
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

      const contactMeetup = contact.meetups.map((m) => {
        return {
          ...m.meetup,
        };
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
        meetup: contactMeetup[0],
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
