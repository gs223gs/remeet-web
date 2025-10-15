"use client";
import { useActionState } from "react";
import { createMeetup } from "@/app/(private)/dashboard/meetup/action";
export default function CreateMeetup() {
  const [state, action, isPending] = useActionState(createMeetup, {
    success: false,
    errors: {},
  });

  if (isPending) return <div>loding</div>;
  return (
    <form action={action}>
      <input type="text" name="name" />
      <input type="date" name="scheduledAt" />
      <button type="submit">送信</button>
      {state && state.errors.auth}
      {state && state.errors.name}
      {state && state.errors.scheduledAt}
      {state && state.errors.server}
    </form>
  );
}
