"server-only";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/auth";
import { Contact } from "@prisma/client";
import { DashboardSummary, ContactDTO } from "@/type/private/dashboard";
/**
 * @description
 *
 */

//最近あった人を取得する
export const getRecentlyContacts = async (
  userId: string,
): Promise<Contact[]> => {
  const contacts = await prisma.contact.findMany({});
  return contacts;
};

//contacts の中からランダムに表示
export const getRandomContacts = async (
  userId: string,
): Promise<ContactDTO[]> => {
  const contacts = await prisma.contact.findMany({});
  return contacts;
};
//クイック登録 これ迷い中

//今年出会った人
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

//前回のmeetup 出会った人を表示
export const getLastMeetupContacts = async (
  userId: string,
): Promise<ContactDTO[]> => {
  const contacts = await prisma.contact.findMany({});
  return contacts;
};

//meetup の数を表示
export const getMeetupCount = async (userId: string): Promise<number> => {
  const meetupCount = await prisma.meetup.count({});
  return meetupCount;
};

export const getUserDashboardSummary = async (): Promise<DashboardSummary> => {
  const user = await getUser();
  if (!user?.id) return false;
  const summary = {
    recentlyContacts: await getRecentlyContacts(user.id),
    randomContacts: await getRandomContacts(user.id),
    thisYearContacts: await getThisYearContacts(user.id),
    lastMeetupContacts: await getLastMeetupContacts(user.id),
    meetupCount: await getMeetupCount(user.id),
  };
  return summary;
};
