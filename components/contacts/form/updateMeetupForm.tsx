"use client";
import { useActionState } from "react";
import { updateMeetup } from "@/app/(private)/dashboard/meetup/action";

export default function UpdateMeetupForm({ meetupId }: { meetupId: string }) {
  const updateMeetupWithMeetupId = updateMeetup.bind(null, meetupId);
  const [state, action, isPending] = useActionState(updateMeetupWithMeetupId, {
    success: false,
    errors: {},
  });

  if (isPending) return <p>loding</p>;

  return (
    <form action={action}>
      <input type="text" name="name" />
      <input type="date" name="scheduleAt" />
      {state && <p>{state.errors.server}</p>}
      <button type="submit">送信</button>
    </form>
  );
}
