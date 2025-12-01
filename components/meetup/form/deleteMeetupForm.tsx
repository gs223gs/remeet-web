"use client";
import { useActionState } from "react";

import { deleteMeetup } from "@/app/(private)/dashboard/meetup/action";
import { Button } from "@/components/ui/button";

type Props = {
  meetupId: string;
};
export const DeleteMeetupForm = ({ meetupId }: Props) => {
  const deleteMeetupWithMeetupId = deleteMeetup.bind(null, meetupId);
  const [state, action, isPending] = useActionState(deleteMeetupWithMeetupId, {
    success: false,
    errors: {},
  });

  const errorMessage = state.errors.server ?? state.errors.auth;
  //TODO modal -> confirm

  return (
    <form action={action} className="w-full space-y-1.5">
      <Button
        type="submit"
        variant="ghost"
        disabled={isPending}
        className="w-full border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
      >
        {isPending ? "削除中..." : "Meetupを削除"}
      </Button>
      {errorMessage ? (
        <p className="text-xs text-red-500">{errorMessage}</p>
      ) : null}
    </form>
  );
};
