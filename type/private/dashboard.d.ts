import type { Result } from "@/type/error/error";
//dashboard ページのための型
export type DashboardSummary = {
  lastMeetupContacts: DashboardContactDTO[];
  thisYearContactCount: number;
  meetupCount: number;
};

export type DashboardContactDTO = {
  meetupId: string;
  meetupName: string;
  meetupScheduledAt: Date;
  contactId: string;
  contactName: string;
};

export type DashboardResult = Result<DashboardSummary>;
