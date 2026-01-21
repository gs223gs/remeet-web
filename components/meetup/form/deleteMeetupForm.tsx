"use client";
import { useActionState } from "react";

import { deleteMeetup } from "@/app/(private)/dashboard/meetup/action";
import { Button } from "@/components/ui/button";

type Props = {
  meetupId: string;
};
export const DeleteMeetupForm = ({ meetupId }: Props) => {
  const deleteMeetupWithMeetupId = deleteMeetup.bind(null, meetupId);
  const [_, action, isPending] = useActionState(deleteMeetupWithMeetupId, null);

  return (
    <form action={action}>
      <Button
        type="submit"
        variant="ghost"
        disabled={isPending}
        className="border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
      >
        {isPending ? "削除中..." : "Meetupを削除"}
      </Button>
    </form>
  );
};
