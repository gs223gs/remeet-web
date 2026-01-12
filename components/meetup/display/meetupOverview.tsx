import { CalendarDays, UsersRound } from "lucide-react";

import type { MeetupDetail } from "@/type/private/meetup/meetup";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dateFormatter } from "@/util/dateFormatter";

type Props = {
  meetupDetail: MeetupDetail;
  meetupContactsCount: number;
};

export const MeetupOverview = ({
  meetupDetail,
  meetupContactsCount,
}: Props) => {
  const scheduledText = dateFormatter(meetupDetail.scheduledAt);

  return (
    <Card className="border-muted bg-card">
      <CardHeader className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
          meetup overview
        </p>
        <CardTitle className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {meetupDetail.name}
        </CardTitle>
        <CardDescription>
          Meetupの基本情報と登録済みのコンタクト数を確認できます。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <CalendarDays className="size-4 text-orange-500" />
              開催日
            </div>
            <p className="text-xl font-semibold text-foreground">
              {scheduledText}
            </p>
            <p className="text-xs text-muted-foreground">Asia/Tokyo</p>
          </div>
          <div className="rounded-xl bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <UsersRound className="size-4 text-blue-500" />
              登録済みコンタクト
            </div>
            <p className="text-3xl font-bold text-foreground">
              {meetupContactsCount}
            </p>
            <p className="text-xs text-muted-foreground">Contacts</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
