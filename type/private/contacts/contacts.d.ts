import { Result } from "@/type/error/error";
import { LinkType } from "@prisma/client";
type Tag = {
  tagsId: string;
  name: string;
};

type ContactLink = {
  id: string;
  type: LinkType;
  url: string;
  handle?: string;
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

export type ContactsDetailResult = Result<ContactsDetailDTO>;
