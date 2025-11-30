"use client";
import { useActionState } from "react";

import { deleteMeetup } from "@/app/(private)/dashboard/meetup/action";

type Props = {
  meetupId: string;
};
export const DeleteMeetupForm = ({ meetupId }: Props) => {
  const deleteMeetupWithMeetupId = deleteMeetup.bind(null, meetupId);
  const [state, action, isPending] = useActionState(deleteMeetupWithMeetupId, {
    success: false,
    errors: {},
  });
  return (
    <form action={action}>
      <button type="submit" disabled={isPending}>
        削除
      </button>
      <p>{state.errors.server}</p>
    </form>
  );
};
