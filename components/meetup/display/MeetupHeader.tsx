import Link from "next/link";

import { Button } from "@/components/ui/button";
import { routes } from "@/util/routes";

export const MeetupHeader = () => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button
        asChild
        size="sm"
        variant="ghost"
        className="border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
      >
        <Link href={routes.dashboardContacts()}>コンタクト一覧</Link>
      </Button>
      <Button
        asChild
        size="sm"
        className="bg-orange-500 text-white shadow-sm hover:bg-orange-500/90"
      >
        <Link href={routes.dashboardMeetupNew()}>Meetupを作成</Link>
      </Button>
    </div>
  );
};
