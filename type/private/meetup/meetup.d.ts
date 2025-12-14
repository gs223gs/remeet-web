import type { Result } from "@/type/error/error";

export type MeetupErrors = {
  name?: string[];
  scheduledAt?: string[];
  auth?: "認証に失敗しました"; //TODO これ汎用性高くしたい
  server?: "server error";
};

export type CreateMeetupInput = {
  userId: string;
  name: string;
  scheduledAt: Date;
};

export type MeetupDetail = Omit<CreateMeetupInput, "userId"> & {
  id: string;
};

export type MeetupDetailContact = {
  id: string;
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

export type MeetupSummary = {
  meetup: MeetupDetail;
  contactsCount: number;
};

//TODO これ廃止させる
export type MeetupResult = Result<MeetupSummary[]>;

export type MeetupOwnershipDTO = {
  meetupId: string;
  userId: string;
};
