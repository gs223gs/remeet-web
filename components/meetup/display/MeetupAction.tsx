import Link from "next/link";

import { DeleteMeetupForm } from "@/components/meetup/form/deleteMeetupForm";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/util/DeleteDialog";
import { routes } from "@/util/routes";

type Props = {
  meetupId: string;
};

export const MeetupAction = ({ meetupId }: Props) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
      <Button
        asChild
        size="sm"
        variant="ghost"
        className=" border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
      >
        <Link href={routes.dashboardMeetupEdit(meetupId)}>Meetupを編集</Link>
      </Button>
      <Button
        asChild
        size="sm"
        className=" bg-orange-500 text-white hover:bg-orange-500/90"
      >
        <Link href={routes.dashboardMeetupContactNew(meetupId)}>
          新しいコンタクトを追加
        </Link>
      </Button>
      <DeleteDialog trigger="Meetupを削除">
        <DeleteMeetupForm meetupId={meetupId} />
      </DeleteDialog>
    </div>
  );
};
