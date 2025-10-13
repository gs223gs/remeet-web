import { Contact } from "@prisma/client";
import { DateTime } from "next-auth/providers/kakao";

//dashboard ページのための型
export type DashboardSummary = {
  randomContact?: ContactDTO;
  recentlyContacts?: ContactDTO[];
  lastMeetupContacts?: ContactDTO[];
  thisYearContactCount?: number;
  meetupConut?: number;
};

export type ContactDTO = {
  meetupName: string;
  meetupScheduledAt: DateTime;
  name: string;
};
