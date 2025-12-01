import Link from "next/link";

import { DeleteMeetupForm } from "@/components/meetup/form/deleteMeetupForm";
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

type MeetupActionsCardProps = {
  meetupId: string;
};

export const MeetupActionsCard = ({ meetupId }: MeetupActionsCardProps) => {
  return (
    <Card className="border-muted/80 bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          アクション
        </CardTitle>
        <CardDescription>
          Meetup情報を更新したり、コンタクトを追加しましょう。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          asChild
          size="sm"
          variant="ghost"
          className="w-full border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
        >
          <Link href={routes.dashboardMeetupEdit(meetupId)}>Meetupを編集</Link>
        </Button>
        <Button
          asChild
          size="sm"
          className="w-full bg-orange-500 text-white hover:bg-orange-500/90"
        >
          <Link href={routes.dashboardMeetupContactNew(meetupId)}>
            新しいコンタクトを追加
          </Link>
        </Button>
      </CardContent>
      <CardFooter className="border-t border-border/70 pt-4">
        <DeleteMeetupForm meetupId={meetupId} />
      </CardFooter>
    </Card>
  );
};
