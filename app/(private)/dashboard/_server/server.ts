"server-only";
import type {
  DashboardResult,
  DashboardContactDTO,
} from "@/type/private/dashboard";

import { getUser } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getThisYearContacts = async (userId: string): Promise<number> => {
  const now = new Date();
  const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));

  const contacts = await prisma.contact.count({
    where: {
      userId: userId,
      createdAt: {
        gte: startOfYear,
      },
    },
  });
  return contacts;
};

export const getLastMeetupContacts = async (
  userId: string,
): Promise<DashboardContactDTO[]> => {
  try {
    const latest = await prisma.meetup.findFirst({
      where: { userId },
      orderBy: { scheduledAt: "desc" },
      select: {
        id: true,
        name: true,
        scheduledAt: true,
        contacts: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!latest) return [];

    return latest.contacts.map((cm) => ({
      meetupId: latest.id,
      meetupName: latest.name,
      meetupScheduledAt: latest.scheduledAt,
      contactId: cm.id,
      contactName: cm.name,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMeetupCount = async (userId: string): Promise<number> => {
  try {
    const meetupCount = await prisma.meetup.count({
      where: {
        userId: userId,
      },
    });
    return meetupCount;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const getUserDashboardSummary = async (): Promise<DashboardResult> => {
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

    const [thisYearContactCount, lastMeetupContacts, meetupCount] =
      await Promise.all([
        getThisYearContacts(user.id),
        getLastMeetupContacts(user.id),
        getMeetupCount(user.id),
      ]);

    return {
      ok: true,
      data: {
        thisYearContactCount,
        lastMeetupContacts,
        meetupCount,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: { code: "db_error", message: ["情報取得に失敗しました"] },
    };
  }
};

// - ヘルパー
// - requireUserResult(): Promise<{ ok: true; user: User } | { ok: false; error: { code: 'unauthenticated'; message: string } }>
// - 使い方
// - const r = await requireUserResult(); if (!r.ok) return r; const user = r.user;
// - イメージ
// - unauthenticatedの文面やコードはヘルパー内で固定し統一できる。
