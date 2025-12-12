import Link from "next/link";

import { Button } from "@/components/ui/button";
import { routes } from "@/util/routes";

type Props = {
  count: number;
};

export const ContactsHeader = ({ count }: Props) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-2 sm:flex-row">
        <p className="text-sm text-muted-foreground">出会った人数: {count}</p>
        <Button
          asChild
          size="sm"
          variant="ghost"
          className="border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
        >
          <Link href={routes.dashboardMeetupList()}>Meetup一覧を開く</Link>
        </Button>
        <Button
          asChild
          size="sm"
          className="bg-orange-500 text-white shadow-sm hover:bg-orange-500/90"
        >
          <Link href={routes.dashboardMeetupNew()}>Meetupを作成</Link>
        </Button>
      </div>
    </div>
  );
};
