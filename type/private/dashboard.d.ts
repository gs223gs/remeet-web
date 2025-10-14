import { Result } from "../error/error";
//dashboard ページのための型
export type DashboardSummary = {
  recentlyContacts: ContactDTO[];
  lastMeetupContacts: ContactDTO[];
  thisYearContactCount: number;
  meetupCount: number;
};

export type ContactDTO = {
  meetupId: string;
  meetupName: string;
  meetupScheduledAt: Date;
  contactId: string;
  contactName: string;
};

export type DashboardResult = Result<DashboardSummary>;
