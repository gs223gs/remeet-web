import Link from "next/link";

import { getContactDetail } from "../_server/server";

import { ContactsErrorCard } from "@/components/contacts/contacts-error-card";
import { ContactsDetailView } from "@/components/contacts/contactsDetailView";
import { DeleteContactForm } from "@/components/contacts/form/deleteContactForm";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/util/DeleteDialog";
import { routes } from "@/util/routes";

export default async function ContactsDetail({
  params,
}: {
  params: Promise<{ meetupId: string; contactsId: string }>;
}) {
  const { meetupId, contactsId } = await params;
  const contactsDetailRes = await getContactDetail(contactsId);

  if (!contactsDetailRes.ok) {
    return (
      <ContactsErrorCard
        message={contactsDetailRes.error?.message?.join(" / ")}
      />
    );
  }

  const contactsDetail = contactsDetailRes.data;

  return (
    <div className="flex min-h-screen flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <DashboardHeader
          eyebrow="contact detail"
          title={`${contactsDetail.name}`}
          description="Meetupで記録したコンタクトの情報を整理し、次のアクションにつなげましょう。"
        />
        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
          >
            <Link href={routes.dashboardMeetupDetail(meetupId)}>
              Meetup詳細へ戻る
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-orange-500 text-white shadow-sm hover:bg-orange-500/90"
          >
            <Link
              href={routes.dashboardMeetupContactEdit(
                meetupId,
                contactsDetail.id,
              )}
            >
              コンタクトを編集
            </Link>
          </Button>
          <DeleteDialog trigger="コンタクトを削除">
            <DeleteContactForm
              contactId={contactsDetail.id}
              meetupId={meetupId}
            />
          </DeleteDialog>
        </div>
      </div>

      <ContactsDetailView contactsDetail={contactsDetail} />
    </div>
  );
}
