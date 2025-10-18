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
const getMeetupContactsCount = async (): Promise<number> => {
  return 1;
};

// meetupの詳細情報
// contactsの簡易情報
/**
 * @returns MeetupDetail
 */
const getMeetupDetailWithContacts =
  async (): Promise<MeetupDetailWithContacts> => {
    const date = new Date();
    return {
      detail: { id: "", name: "", scheduledAt: date },
      contacts: [{ name: "", tags: [] }],
    };
  };

// 最終的に全てをまとめて返す
export const getMeetupDetailSummary = async (): Promise<MeetupDetailResult> => {
  const [contactsCount, meetupDetailWithContacts] = await Promise.all([
    getMeetupContactsCount(),
    getMeetupDetailWithContacts(),
  ]);
  return {
    ok: true,
    data: {
      contactCount: contactsCount,
      detailWithContacts: meetupDetailWithContacts,
    },
  };
};
