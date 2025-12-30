import type { ContactsDetailDTO } from "@/type/private/contacts/contacts";
import type { MeetupDetail } from "@/type/private/meetup/meetup";

export type TagContact = ContactsDetailDTO & { meetup: MeetupDetail };
