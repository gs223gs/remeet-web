import { getContactDetail, getTags } from "../../_server/server";

import { ContactsUpdateForm } from "@/components/contacts/form/contactsUpdateForm";

/**
 * Render the contacts update page for a specific meetup.
 *
 * Fetches contact details and available tags, and renders a ContactsUpdateForm populated with the retrieved data.
 *
 * @param params - A promise that resolves to route parameters containing `meetupId` and `contactsId`.
 * @returns A React element displaying the contacts update form when data is available, or a simple error element if fetching tags or contact details fails.
 */
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