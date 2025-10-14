import { Contact } from "@prisma/client";
import { DateTime } from "next-auth/providers/kakao";
import { Result } from "../error/error";
//dashboard ページのための型
export type DashboardSummary = {
  randomContacts?: ContactDTO[];
  recentlyContacts?: ContactDTO[];
  lastMeetupContacts?: ContactDTO[];
  thisYearContactCount?: number;
  meetupCount?: number;
};

export type ContactDTO = {
  meetupName: string;
  meetupScheduledAt: DateTime;
  name: string;
};

export type DashboardResult = Result<DashboardSummary>;
