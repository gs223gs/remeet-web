"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "@/auth";

import {
  MeetupDetailResult,
  MeetupDetailSummary,
} from "@/type/private/meetup/meetup";

// meetupの詳細情報
// contactsの簡易情報
/**
 * @returns MeetupDetail
 */
export const getMeetupDetailWithContacts = async (
  meetupId: string,
  userId: string,
): Promise<MeetupDetailSummary | null> => {
  try {
    const detail = await prisma.meetup.findFirst({
      where: { id: meetupId, userId },
      select: {
        id: true,
        name: true,
        scheduledAt: true,
        _count: {
          select: {
            contacts: true,
          },
        },
        contacts: {
          select: {
            contact: {
              select: {
                id: true,
                name: true,
                company: true,
                role: true,
                tags: {
                  select: {
                    tag: {
                      select: {
                        name: true,
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

    if (!detail) return null;

    return {
      contactCount: detail._count.contacts,
      detailWithContacts: {
        detail: {
          id: detail.id,
          name: detail.name,
          scheduledAt: detail.scheduledAt,
        },
        contacts: detail.contacts.map((c) => {
          return {
            id: c.contact.id,
            name: c.contact.name,
            company: c.contact.company ?? undefined,
            role: c.contact.role ?? undefined,
            tags: c.contact.tags.map((t) => t.tag.name),
          };
        }),
      },
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMeetupDetailSummary = async (
  meetupId: string,
): Promise<MeetupDetailResult> => {
  const user = await getUser();

  if (!user)
    return {
      ok: false,
      error: {
        code: "unauthenticated",
        message: ["情報取得に失敗しました"],
      },
    };

  const meetupDetailWithContacts = await getMeetupDetailWithContacts(
    meetupId,
    user.id,
  );

  if (!meetupDetailWithContacts)
    return {
      ok: false,
      error: {
        code: "unauthenticated",
        message: ["情報取得に失敗しました"],
      },
    };

  return {
    ok: true,
    data: meetupDetailWithContacts,
  };
};
