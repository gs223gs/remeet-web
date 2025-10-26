import { Result } from "@/type/error/error";
import { LinkType } from "@prisma/client";
type Tag = {
  id: string;
  name: string;
};

type ContactLink = {
  id: string;
  type: LinkType;
  url: string;
  handle?: string;
};

type CreateContactLink = Omit<ContactLink, "id"> & {
  contactId: string;
};
type ContactsDetailDTO = {
  id: string;
  name: string;
  company?: string;
  role?: string;
  description?: string;
  links?: ContactLink[];
  tags?: Tag[];
};

//TODO これそもそもschemaと合ってないから治す
export type ContactsErrors = {
  name?: string[];
  scheduledAt?: string[];
  auth?: "認証に失敗しました"; //TODO これ汎用性高くしたい
  server?: "server error";
};

export type ContactsDetailResult = Result<ContactsDetailDTO>;
