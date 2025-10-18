"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "@/auth";

import {
  MeetupDetailWithContacts,
  MeetupDetailResult,
} from "@/type/private/meetup/meetup";

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

  const meetupDetailWithContacts = await getMeetupDetailWithContacts(
    meetupId,
    user.id,
  );

  return {
    ok: true,
    data: {
      contactCount: meetupDetailWithContacts.contacts.length,
      detailWithContacts: meetupDetailWithContacts,
    },
  };
};
