import Link from "next/link";

import { getMeetup } from "@/app/(private)/dashboard/meetup/_server/server";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { MeetupList } from "@/components/meetup/display/meetup-list";
import { MeetupHeader } from "@/components/meetup/display/MeetupHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Meetup() {
  const res = await getMeetup();

  if (!res.ok) {
    return (
      <div className="flex min-h-[70vh] flex-1 items-center justify-center px-6 py-10">
        <Card className="max-w-md text-center">
          <CardHeader>
            <CardTitle>情報取得に失敗しました</CardTitle>
            <CardDescription>
              {res.error?.message?.join(" / ") ??
                "再度読み込みをお試しください。"}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button
              asChild
              className="bg-orange-500 text-white hover:bg-orange-500/90"
            >
              <Link href="/dashboard/meetup">リロード</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const meetups = res.data;

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
      <MeetupList meetups={meetups} />
    </div>
  );
}
