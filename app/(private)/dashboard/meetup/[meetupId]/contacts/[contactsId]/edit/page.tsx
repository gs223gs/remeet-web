import Link from "next/link";

import { getContactDetail, getTags } from "../../_server/server";

import { ContactsErrorCard } from "@/components/contacts/contacts-error-card";
import { ContactsUpdateForm } from "@/components/contacts/form/contactsUpdateForm";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { routes } from "@/util/routes";

export default async function ContactsUpdatePage({
  params,
}: {
  params: Promise<{ meetupId: string; contactsId: string }>;
}) {
  const { meetupId, contactsId } = await params;
  const [contactsDetailRes, tagsRes] = await Promise.all([
    getContactDetail(contactsId),
    getTags(),
  ]);

  if (!tagsRes.ok) {
    return (
      <ContactsErrorCard message="タグ一覧の取得に失敗しました。時間をおいて再度お試しください。" />
    );
  }

  if (!contactsDetailRes.ok) {
    return (
      <ContactsErrorCard
        message={
          contactsDetailRes.error?.message?.join(" / ") ??
          "コンタクト情報の取得に失敗しました。時間をおいて再度お試しください。"
        }
      />
    );
  }

  const contactsDetail = contactsDetailRes.data;

  return (
    <div className="flex min-h-screen flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <DashboardHeader
          eyebrow="contacts"
          title={`${contactsDetail.name}を編集`}
          description="記録済みのコンタクト情報をアップデートして、次に会うときやフォローアップの準備を整えましょう。"
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
              href={routes.dashboardMeetupContactDetail(meetupId, contactsId)}
            >
              コンタクト詳細を開く
            </Link>
          </Button>
        </div>
      </div>
      <ContactsUpdateForm
        meetupId={meetupId}
        tags={tagsRes.data}
        contactsDetail={contactsDetail}
      />
    </div>
  );
}
