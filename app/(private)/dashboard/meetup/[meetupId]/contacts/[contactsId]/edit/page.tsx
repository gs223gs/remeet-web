import { getContactDetail, getTags } from "../../_server/server";

import { ContactsUpdateForm } from "@/components/contacts/form/contactsUpdateForm";

export default async function ContactsUpdatePage({
  params,
}: {
  params: Promise<{ meetupId: string; contactsId: string }>;
}) {
  const { meetupId, contactsId } = await params;
  const contactsDetailRes = await getContactDetail(contactsId);
  const tagsRes = await getTags();

  if (!tagsRes.ok) {
    return <div>tags error</div>;
  }
  if (!contactsDetailRes.ok) {
    return <div>contacts error</div>;
  }
  return (
    <ContactsUpdateForm
      meetupId={meetupId}
      tags={tagsRes.data}
      contactsDetail={contactsDetailRes.data}
    />
  );
}
