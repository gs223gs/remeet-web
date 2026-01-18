import type { Result } from "@/type/error/error";
import type { Tag } from "@/type/private/tags/tags";
import type { LinkType } from "@prisma/client";

type ContactLink = {
  id: string;
  type: LinkType;
  url: string;
  handle?: string;
};

//TODO update contacts を refactoringしたら消す
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

export type ContactsFormData = {
  name: string;
  company?: string;
  role?: string;
  description?: string;
  tags?: string[];
  githubHandle?: string;
  githubId?: string;
  twitterHandle?: string;
  twitterId?: string;
  websiteHandle?: string;
  websiteUrl?: string;
  productHandle?: string;
  productUrl?: string;
  otherHandle?: string;
  other?: string;
};

//TODO これそもそもschemaと合ってないから治す
export type ContactsErrors = {
  name?: string[];
  scheduledAt?: string[];
  auth?: "認証に失敗しました"; //TODO これ汎用性高くしたい
  server?: "server error";
};

//TODO これも廃止する
export type ContactsDetailResult = Result<ContactsDetailDTO>;

export type ContactOwnershipDTO = {
  contactId: string;
  userId: string;
};
