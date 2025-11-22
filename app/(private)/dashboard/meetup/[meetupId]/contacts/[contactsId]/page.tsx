import { getContactDetail } from "../_server/server";

import { ContactsDetailView } from "@/components/contacts/contactsDetailView";

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
