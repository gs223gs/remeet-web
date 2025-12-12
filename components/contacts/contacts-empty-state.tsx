import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { routes } from "@/util/routes";

export const ContactsEmptyState = () => {
  return (
    <Card className="border-dashed border-muted-foreground/40 bg-card">
      <CardContent className="flex min-h-[220px] flex-col items-center justify-center gap-3 text-center">
        <div className="space-y-2">
          <CardTitle>まだコンタクトが登録されていません</CardTitle>
          <CardDescription>
            Meetup詳細ページから出会った人を記録し、つながりを整理しましょう。
          </CardDescription>
        </div>
        <Button
          asChild
          className="bg-orange-500 text-white hover:bg-orange-500/90"
        >
          <Link href={routes.dashboardMeetupList()}>Meetup一覧を開く</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
