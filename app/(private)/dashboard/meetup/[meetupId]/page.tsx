import Link from "next/link";

import { getMeetupDetailSummary } from "../_server/server";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { MeetupContactCard } from "@/components/meetup/display/meetup-contact-card";
import { MeetupAction } from "@/components/meetup/display/MeetupAction";
import { MeetupOverview } from "@/components/meetup/display/MeetupOverview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { routes } from "@/util/routes";

export default async function MeetupDetail({
  params,
}: {
  params: Promise<{ meetupId: string }>;
}) {
  const { meetupId } = await params;
  const detail = await getMeetupDetailSummary(meetupId);

  if (!detail.ok) {
    return (
      <div className="flex min-h-[70vh] flex-1 items-center justify-center px-6 py-10">
        <Card className="max-w-md text-center">
          <CardHeader>
            <CardTitle>情報取得に失敗しました</CardTitle>
            <CardDescription>
              {detail.error?.message?.join(" / ") ??
                "再度読み込みをお試しください。"}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button
              asChild
              className="bg-orange-500 text-white hover:bg-orange-500/90"
            >
              <Link href={routes.dashboardMeetupList()}>
                ダッシュボードへ戻る
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const meetupDetail = detail.data.detailWithContacts.detail;
  const contacts = detail.data.detailWithContacts.contacts;
  const contactCount = detail.data.contactCount;

  return (
    <div className="flex flex-1 flex-col min-h-screen gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-4 pb-2 lg:flex-row lg:items-center lg:justify-between">
        <DashboardHeader
          eyebrow="meetup detail"
          title={`${meetupDetail.name}の詳細`}
          description="Meetupの概要と登録済みのコンタクトを確認できます。"
        />
        <MeetupAction meetupId={meetupId} />
      </div>

      <div className="">
        <MeetupOverview
          meetupDetail={meetupDetail}
          meetupContactsCount={contactCount}
        />
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-foreground">
              登録済みコンタクト
            </p>
            <p className="text-sm text-muted-foreground">
              このMeetupで記録したつながりは{contactCount}件です。
            </p>
          </div>
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
          >
            <Link href={routes.dashboardMeetupContactNew(meetupId)}>
              コンタクトを追加
            </Link>
          </Button>
        </div>

        {contacts.length ? (
          <div className="grid grid-cols-1 gap-4 w-full md:grid-cols-4 ">
            {contacts.map((c) => (
              <MeetupContactCard key={c.id} meetupId={meetupId} contact={c} />
            ))}
          </div>
        ) : (
          <Card className="border-dashed border-muted-foreground/40 bg-card">
            <CardContent className="flex min-h-[220px] flex-col items-center justify-center gap-3 text-center">
              <div className="space-y-2">
                <CardTitle>まだコンタクトが登録されていません</CardTitle>
                <CardDescription>
                  出会った人を記録して、フォローアップを忘れないようにしましょう。
                </CardDescription>
              </div>
              <Button
                asChild
                className="bg-orange-500 text-white hover:bg-orange-500/90"
              >
                <Link href={routes.dashboardMeetupContactNew(meetupId)}>
                  コンタクトを追加
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
