import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { routes } from "@/util/routes";

export const MeetupEmptyState = () => {
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
};
