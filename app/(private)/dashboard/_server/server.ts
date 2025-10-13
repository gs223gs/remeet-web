"server-only";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/auth";
import { Contact } from "@prisma/client";
import {
  DashboardResult,
  ContactDTO,
  DashboardSummary,
} from "@/type/private/dashboard";
import { Result, AppError } from "@/type/error/error";
/**
 * @description
 *
 */

//最近あった人を取得する
export const getRecentlyContacts = async (
  userId: string,
): Promise<ContactDTO[]> => {
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
//TODO error handring
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
  const meetupCount = await prisma.meetup.count({
    where: {
      userId: userId,
    },
  });
  return meetupCount;
};
//TODO return 後で変更しなければいけない
export const getUserDashboardSummary = async (): Promise<DashboardResult> => {
  const user = await getUser();
  if (!user?.id)
    return {
      ok: false,
      error: { code: "authorization", message: "" },
    };
  const summary: DashboardSummary = {
    recentlyContacts: await getRecentlyContacts(user.id),
    randomContacts: await getRandomContacts(user.id),
    thisYearContacts: await getThisYearContacts(user.id),
    lastMeetupContacts: await getLastMeetupContacts(user.id),
    meetupCount: await getMeetupCount(user.id),
  };
  return {
    ok: true,
    data: summary,
  };
};
