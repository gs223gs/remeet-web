import Link from "next/link";

import { getUserDashboardSummary } from "@/app/(private)/dashboard/_server/server";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import {
  LatestMeetupCard,
  type LatestMeetupData,
} from "@/components/dashboard/latest-meetup-card";
import { MeetupHeader } from "@/components/meetup/display/MeetupHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const summary = await getUserDashboardSummary();

  if (!summary.ok) {
    return (
      <div className="flex min-h-[70vh] flex-1 items-center justify-center px-6 py-10">
        <Card className="max-w-md text-center">
          <CardHeader>
            <CardTitle>情報取得に失敗しました</CardTitle>
            <CardDescription>
              {summary.error?.message?.join(" / ") ??
                "再度読み込みをお試しください。"}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button
              asChild
              className="bg-orange-500 text-white hover:bg-orange-500/90"
            >
              <Link href="/dashboard">リロード</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const { meetupCount, thisYearContactCount, lastMeetupContacts } =
    summary.data;

  const latestMeetup: LatestMeetupData | null = lastMeetupContacts.length
    ? {
        meetupId: lastMeetupContacts[0].meetupId,
        name: lastMeetupContacts[0].meetupName,
        scheduledAt: lastMeetupContacts[0].meetupScheduledAt,
        contacts: lastMeetupContacts.map((c) => ({
          id: c.contactId,
          name: c.contactName,
        })),
      }
    : null;

  const latestMeetupSummary = latestMeetup
    ? { name: latestMeetup.name, scheduledAt: latestMeetup.scheduledAt }
    : null;

  return (
    <div className="flex min-h-screen flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <DashboardHeader
          eyebrow="registered meetups"
          title="登録済みMeetup"
          description="登録済みのMeetupから、出会った人の記録へアクセスできます。"
        />
        <MeetupHeader />
      </div>
      <section className="flex flex-col gap-6">
        <DashboardStats
          meetupCount={meetupCount}
          thisYearContactCount={thisYearContactCount}
          latestMeetup={latestMeetupSummary}
        />
        <LatestMeetupCard latestMeetup={latestMeetup} />
      </section>
    </div>
  );
}
