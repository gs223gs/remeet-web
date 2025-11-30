import Link from "next/link";

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

export type LatestMeetupData = {
  meetupId: string;
  name: string;
  scheduledAt: Date;
  contacts: { id: string; name: string }[];
};

type LatestMeetupCardProps = {
  latestMeetup: LatestMeetupData | null;
};

export function LatestMeetupCard({ latestMeetup }: LatestMeetupCardProps) {
  return (
    <Card className="border-muted bg-card">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle>最新のMeetup</CardTitle>
        <CardDescription>
          {latestMeetup
            ? `${dateFormatter(latestMeetup.scheduledAt)} 開催`
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
                  <Link
                    href={`/dashboard/meetup/${latestMeetup.meetupId}/contacts/${contact.id}`}
                    className="text-xs font-medium text-orange-500"
                  >
                    詳細へ
                  </Link>
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
  );
}
