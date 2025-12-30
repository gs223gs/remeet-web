import type { ContactsDetailDTO } from "@/type/private/contacts/contacts";
import type { MeetupDetail } from "@/type/private/meetup/meetup";

export type Tag = {
  id: string;
  name: string;
};

type TagErrors = {
  id?: string;
  tag?: string;
  auth?: "認証に失敗しました"; //TODO これ汎用性高くしたい
  server?: "server error";
};

export type TagContact = ContactsDetailDTO & { meetup: MeetupDetail };
