import { CalendarDays, UsersRound } from "lucide-react";
import Link from "next/link";

import type { MeetupDetail, MeetupSummary } from "@/type/private/meetup/meetup";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dateFormatter } from "@/util/dateFormatter";
import { routes } from "@/util/routes";

export function MeetupList({ meetups }: { meetups: MeetupSummary[] }) {
  if (!meetups.length) {
    return <MeetupEmptyState />;
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm text-muted-foreground">全{meetups.length}件</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {meetups.map((m) => (
          <MeetupCard
            key={m.meetup.id}
            meetup={m.meetup}
            contactsCount={m.contactsCount}
          />
        ))}
      </div>
    </section>
  );
}

type MeetupCardProps = {
  meetup: MeetupDetail;
  contactsCount: number;
};

function MeetupCard({ meetup, contactsCount }: MeetupCardProps) {
  const scheduledText = dateFormatter(meetup.scheduledAt);

  return (
    <Card className="border-muted bg-card">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold text-foreground">
          {meetup.name}
        </CardTitle>
        <CardDescription>{scheduledText} 開催</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-xl bg-muted/40 px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <CalendarDays className="size-4 text-orange-500" />
            開催日
          </div>
          <p className="text-lg font-semibold text-foreground">
            {scheduledText}
          </p>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-dashed border-muted-foreground/40 px-3 py-2">
          <div>
            <p className="text-sm font-medium text-foreground">
              登録済みコンタクト
            </p>
            <p className="text-xs text-muted-foreground">Contacts</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">
              <UsersRound className="size-4" />
            </div>
            <p className="text-2xl font-bold">{contactsCount}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          詳細ページで参加者の情報を思い出しましょう。
        </p>
        <Button
          asChild
          size="sm"
          className="bg-orange-500 text-white hover:bg-orange-500/90"
        >
          <Link href={routes.dashboardMeetupDetail(meetup.id)}>
            Meetup詳細へ
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function MeetupEmptyState() {
  return (
    <Card className="border-dashed border-muted-foreground/40 bg-card">
      <CardContent className="flex min-h-[220px] flex-col items-center justify-center gap-3 text-center">
        <div className="space-y-2">
          <CardTitle>まだMeetupがありません</CardTitle>
          <CardDescription>
            参加したMeetupを登録して、つながりの履歴を残しましょう。
          </CardDescription>
        </div>
        <Button
          asChild
          className="bg-orange-500 text-white hover:bg-orange-500/90"
        >
          <Link href={routes.dashboardMeetupNew()}>Meetupを作成</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
