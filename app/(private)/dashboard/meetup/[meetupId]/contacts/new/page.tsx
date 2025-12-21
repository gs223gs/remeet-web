import Link from "next/link";

import { getTags } from "../_server/server";

import { ContactsErrorCard } from "@/components/contacts/contacts-error-card";
import { CreateContactForm } from "@/components/contacts/form/CreateContactForm";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import { routes } from "@/util/routes";

export default async function CreateContacts({
  params,
}: {
  params: Promise<{ meetupId: string }>;
}) {
  const { meetupId } = await params;
  const tags = await getTags();

  if (!tags.ok) {
    return (
      <ContactsErrorCard message="タグ一覧の取得に失敗しました。時間をおいて再度お試しください。" />
    );
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <DashboardHeader
          eyebrow="contacts"
          title="コンタクトを記録"
          description="Meetupで出会った人の情報や印象を整理しましょう。タグを活用すると、あとから見返すときに探しやすくなります。"
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
            <Link href={routes.dashboardContacts()}>コンタクト一覧を開く</Link>
          </Button>
        </div>
      </div>
      <CreateContactForm meetupId={meetupId} tags={tags.data} />
    </div>
  );
}
