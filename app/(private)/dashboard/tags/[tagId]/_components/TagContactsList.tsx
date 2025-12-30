import { ContactCard } from "@/components/contacts/contact-card";

import { TagContactsEmptyState } from "./TagContactsEmptyState";

import type { TagContact } from "../_types/TagContact";

type Props = {
  contacts: TagContact[];
  tagName: string;
};

export const TagContactsList = ({ contacts, tagName }: Props) => {
  return (
    <div>
      {contacts.length ? (
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {contacts.map((c) => (
            <ContactCard key={c.id} contact={c} />
          ))}
        </div>
      ) : (
        <TagContactsEmptyState tagName={tagName} />
      )}
    </div>
  );
};
