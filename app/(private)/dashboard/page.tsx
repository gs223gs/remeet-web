import {
  CalendarDays,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { getUserDashboardSummary } from "./_server/server";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/color-mode-toggle";

export const dynamic = "force-dynamic";

const numberFormatter = new Intl.NumberFormat("ja-JP");
const meetupDateFormatter = new Intl.DateTimeFormat("ja-JP", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Tokyo",
});

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

  const latestMeetup = lastMeetupContacts.length
    ? {
        meetupId: lastMeetupContacts[0].meetupId,
        name: lastMeetupContacts[0].meetupName,
        scheduledAt: lastMeetupContacts[0].meetupScheduledAt,
        contacts: lastMeetupContacts.map((contact) => ({
          id: contact.contactId,
          name: contact.contactName,
        })),
      }
    : null;

  const stats: {
    label: string;
    value: string;
    helper: string;
    icon: LucideIcon;
    accent: string;
  }[] = [
    {
      label: "登録済みMeetup",
      value: numberFormatter.format(meetupCount),
      helper: "開催済み・予定中のイベント数",
      icon: CalendarDays,
      accent: "bg-orange-500/10 text-orange-600",
    },
    {
      label: "今年のコンタクト",
      value: numberFormatter.format(thisYearContactCount),
      helper: "今年追加したつながり",
      icon: UsersRound,
      accent: "bg-blue-500/10 text-blue-600",
    },
    {
      label: "最新Meetup",
      value: latestMeetup ? latestMeetup.name : "未登録",
      helper: latestMeetup
        ? meetupDateFormatter.format(latestMeetup.scheduledAt)
        : "開催日を登録して履歴を残しましょう",
      icon: Sparkles,
      accent: "bg-emerald-500/10 text-emerald-600",
    },
  ];

  return (
    <div className="flex min-h-screen flex-1 flex-col gap-6  px-4 py-6 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-4 pb-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            直近のMeetupとコンタクト状況をここで素早く確認
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ModeToggle />
          <Button
            asChild
            variant="ghost"
            className="border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-500/40 dark:bg-blue-500/20 dark:text-blue-50"
          >
            <Link href="/dashboard/meetup">Meetup一覧</Link>
          </Button>
          <Button
            asChild
            className="bg-orange-500 text-white shadow-sm hover:bg-orange-500/90"
          >
            <Link href="/dashboard/meetup/new">Meetupを作成</Link>
          </Button>
        </div>
      </div>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,1fr)]">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardDescription className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {stat.label}
                  </CardDescription>
                  <CardTitle className="text-3xl font-bold">
                    {stat.value}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{stat.helper}</p>
                </div>
                <div
                  className={`flex size-11 items-center justify-center rounded-full ${stat.accent}`}
                >
                  <stat.icon className="size-5" />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="border-muted bg-card">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle>最新のMeetup</CardTitle>
            <CardDescription>
              {latestMeetup
                ? `${meetupDateFormatter.format(latestMeetup.scheduledAt)} 開催`
                : "まだMeetupが登録されていません"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {latestMeetup ? (
              <>
                <div className="rounded-xl bg-muted/40 px-4 py-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    MeetUp名
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {latestMeetup.name}
                  </p>
                </div>
                <div className="space-y-2">
                  {latestMeetup.contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between rounded-lg border border-dashed border-muted-foreground/40 px-3 py-2"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {contact.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          直近のコンタクト
                        </p>
                      </div>
                      <span className="text-xs font-medium text-orange-500">
                        メモ確認
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-muted px-4 text-sm text-muted-foreground">
                まだMeetupがありません。オレンジのボタンから作成して、つながりの履歴を残しましょう。
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-2 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              直近のつながりを振り返り、次のアクションを忘れずに。
            </p>
            {latestMeetup && (
              <Button
                asChild
                size="sm"
                className="bg-orange-500 text-white hover:bg-orange-500/90"
              >
                <Link href={`/dashboard/meetup/${latestMeetup.meetupId}`}>
                  Meetup詳細を開く
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
