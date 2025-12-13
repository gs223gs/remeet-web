import {
  CalendarDays,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dateFormatter } from "@/util/dateFormatter";

type LatestMeetupSummary = {
  name: string;
  scheduledAt: Date;
};

type DashboardStatsProps = {
  meetupCount: number;
  thisYearContactCount: number;
  latestMeetup?: LatestMeetupSummary | null;
};

const numberFormatter = new Intl.NumberFormat("ja-JP");

export function DashboardStats({
  meetupCount,
  thisYearContactCount,
  latestMeetup,
}: DashboardStatsProps) {
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
        ? dateFormatter(latestMeetup.scheduledAt)
        : "開催日を登録して履歴を残しましょう",
      icon: Sparkles,
      accent: "bg-emerald-500/10 text-emerald-600",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardDescription className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {stat.label}
              </CardDescription>
              <CardTitle className="text-3xl font-bold">{stat.value}</CardTitle>
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
  );
}
