"server-only";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/auth";
import { DashboardResult, ContactDTO } from "@/type/private/dashboard";

export const getThisYearContacts = async (userId: string): Promise<number> => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);

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
): Promise<ContactDTO[]> => {
  try {
    const latest = await prisma.meetup.findFirst({
      where: { userId },
      orderBy: { scheduledAt: "desc" },
      include: {
        contacts: {
          include: {
            contact: {
              select: { name: true },
            },
          },
        },
      },
    });

    if (!latest) return [];

    return latest.contacts.map((cm) => ({
      meetupId: cm.meetupId,
      meetupName: latest.name,
      meetupScheduledAt: latest.scheduledAt,
      contactId: cm.contactId,
      contactName: cm.contact.name,
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
    if (!user?.id)
      return {
        ok: false,
        error: {
          code: "unauthenticated",
          message: "情報取得に失敗しましたこのこの",
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
      error: { code: "db_error", message: "情報取得に失敗しました" },
    };
  }
};
