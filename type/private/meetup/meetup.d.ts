import { Result } from "@/type/error/error";

export type MeetupErrors = {
  name?: string[];
  scheduledAt?: string[];
  auth?: "認証に失敗しました"; //TODO これ汎用性高くしたい
  server?: "server error";
};

export type MeetupDetail = {
  id: string;
  name: string;
  scheduledAt: Date;
};

export type MeetupDetailContact = {
  name: string;
  company?: string;
  role?: string;
  tags: string[];
};

export type MeetupDetailWithContacts = {
  detail: MeetupDetail;
  contacts: MeetupDetailContact[];
};
export type MeetupDetailSummary = {
  detailWithContacts: MeetupDetailWithContacts;
  contactCount: number;
};

export type MeetupDetailResult = Result<MeetupDetailSummary>;
