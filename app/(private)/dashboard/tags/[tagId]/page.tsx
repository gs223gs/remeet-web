import type { TagContact } from "@/type/private/tags/tags";

import {
  getContactsByTag,
  getTag,
} from "@/app/(private)/dashboard/tags/[tagId]/_server/server";
import { ContactsErrorCard } from "@/components/contacts/contacts-error-card";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { TagContactsHeader } from "@/components/tag/display/TagContactsHeader";
import { TagContactsList } from "@/components/tag/display/TagContactsList";

export default async function TagContactsPage({
  params,
}: {
  params: Promise<{ tagId: string }>;
}) {
  const { tagId } = await params;
  const [tagResult, contactsResult] = await Promise.all([
    getTag(tagId),
    getContactsByTag(tagId),
  ]);

  if (!tagResult.ok) {
    return (
      <ContactsErrorCard message={tagResult.error?.message?.join(" / ")} />
    );
  }

  if (!contactsResult.ok) {
    return (
      <ContactsErrorCard message={contactsResult.error?.message?.join(" / ")} />
    );
  }

  const tag = tagResult.data;
  const contacts: TagContact[] = contactsResult.data ?? [];

  return (
    <div className="flex min-h-screen flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <DashboardHeader
          eyebrow="tag detail"
          title={`${tag.name} のコンタクト`}
          description="タグに紐づくコンタクトを確認し、フォローアップに活用しましょう。"
        />
        <TagContactsHeader tagId={tag.id} />
      </div>

      <section>
        <div className="space-y-4">
          <TagContactsList contacts={contacts} tagName={tag.name} />
        </div>
      </section>
    </div>
  );
}
