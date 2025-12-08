import { ContactCard } from "./contact-card";
import { ContactsEmptyState } from "./contacts-empty-state";

import type { ContactsDetailDTO } from "@/type/private/contacts/contacts";
import type { MeetupDetail } from "@/type/private/meetup/meetup";

type ContactWithMeetup = ContactsDetailDTO & { meetup: MeetupDetail };

type Props = {
  contacts: ContactWithMeetup[];
};

export const ContactsList = ({ contacts }: Props) => {
  if (!contacts.length) {
    return <ContactsEmptyState />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};
