"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "@/auth";

import {
  MeetupDetailWithContacts,
  MeetupDetailResult,
} from "@/type/private/meetup/meetup";
// meetupで出会った人の数

/**
 * @returns number
 */
const getMeetupContactsCount = async (
  meetupId: string,
  userId: string,
): Promise<number> => {
  return 1;
};

// meetupの詳細情報
// contactsの簡易情報
/**
 * @returns MeetupDetail
 */
const getMeetupDetailWithContacts = async (
  meetupId: string,
  userId: string,
): Promise<MeetupDetailWithContacts> => {
  const date = new Date();
  return {
    detail: { id: "", name: "", scheduledAt: date },
    contacts: [{ name: "", tags: [] }],
  };
};

// 最終的に全てをまとめて返す
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

  const [contactsCount, meetupDetailWithContacts] = await Promise.all([
    getMeetupContactsCount(meetupId, user.id),
    getMeetupDetailWithContacts(meetupId, user.id),
  ]);
  return {
    ok: true,
    data: {
      contactCount: contactsCount,
      detailWithContacts: meetupDetailWithContacts,
    },
  };
};
