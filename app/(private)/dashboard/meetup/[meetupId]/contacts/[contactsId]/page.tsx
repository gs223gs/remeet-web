import { getContactDetail } from "../_server/server";

import { ContactsDetailView } from "@/components/contacts/contactsDetailView";

/**
 * Renders a contact detail page for a given meetup and contact.
 *
 * Awaits the provided `params` to obtain `meetupId` and `contactsId`, fetches the contact detail, and renders either an error block containing the meetup and contact IDs plus any error messages, or the ContactsDetailView component populated with the fetched contact detail.
 *
 * @param params - A promise that resolves to an object with `meetupId` and `contactsId`.
 * @returns The page UI: an error block when fetching fails, or the ContactsDetailView when fetching succeeds.
 */
export default async function ContactsDetail({
  params,
}: {
  params: Promise<{ meetupId: string; contactsId: string }>;
}) {
  const { meetupId, contactsId } = await params;
  const contactsDetailRes = await getContactDetail(contactsId);

  if (!contactsDetailRes.ok) {
    return (
      <div>
        <div>meetup: {meetupId}</div>
        <div>contacts: {contactsId}</div>
        <div>エラー</div>
        {contactsDetailRes.error?.message?.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>
    );
  }

  const contactsDetail = contactsDetailRes.data;

  return (
    <ContactsDetailView contactsDetail={contactsDetail} meetupId={meetupId} />
  );
}
