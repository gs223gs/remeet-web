"use server";

import type { Result } from "@/type/error/error";
import type {
  MeetupDetail,
  MeetupDetailResult,
  MeetupDetailSummary,
  MeetupResult,
} from "@/type/private/meetup/meetup";

import { getUser } from "@/auth";
import { prisma } from "@/lib/prisma";

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
          orderBy: {
            createdAt: "desc",
          },
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
            id: c.id,
            name: c.name,
            company: c.company ?? undefined,
            role: c.role ?? undefined,
            tags: c.tags.map((t) => t.tag.name),
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

export const getMeetup = async (): Promise<MeetupResult> => {
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
    const meetups = await prisma.meetup.findMany({
      where: { userId: user.id },
      orderBy: {
        scheduledAt: "desc",
      },
      select: {
        id: true,
        name: true,
        scheduledAt: true,
        _count: {
          select: {
            contacts: true,
          },
        },
      },
    });

    return {
      ok: true,
      data: meetups.map((m) => {
        return {
          meetup: {
            id: m.id,
            name: m.name,
            scheduledAt: m.scheduledAt,
          },
          contactsCount: m._count.contacts,
        };
      }),
    };
  } catch (error) {
    console.error(error);
    //TODO あとで正しくする
    return {
      ok: false,
      error: {
        code: "db_error",
        message: ["情報取得に失敗しました"],
      },
    };
  }
};

export const getMeetupDetail = async (
  meetupId: string,
): Promise<Result<MeetupDetail>> => {
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
    const meetupDetail = await prisma.meetup.findFirst({
      where: { id: meetupId, userId: user.id },
      select: {
        id: true,
        name: true,
        scheduledAt: true,
      },
    });

    if (!meetupDetail) {
      return {
        ok: false,
        error: {
          code: "not_found",
          message: ["meetupが存在しません"],
        },
      };
    }

    return {
      ok: true,
      data: meetupDetail,
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
