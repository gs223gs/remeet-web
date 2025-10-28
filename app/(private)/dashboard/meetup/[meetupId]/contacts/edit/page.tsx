"use client";

import { useActionState } from "react";

export default function MeetupEdit() {
  const [state, action, pending] = useActionState(updateMeetup(), {
    success: false,
    error: {},
  });
  return (
    <form action="">
      <input type="text" />
      <input type="date" />
    </form>
  );
}
