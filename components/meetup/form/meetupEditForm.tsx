"use client";
import { useActionState } from "react";

import type { MeetupDetail } from "@/type/private/meetup/meetup";

import { updateMeetup } from "@/app/(private)/dashboard/meetup/action";

type MeetupEditProps = {
  meetupDetail: MeetupDetail;
};

export const MeetupEditForm = ({ meetupDetail }: MeetupEditProps) => {
  const updateMeetupWithMeetupId = updateMeetup.bind(null, meetupDetail.id);
  const [_, action, isPending] = useActionState(updateMeetupWithMeetupId, null);

  //TODO あとでライブラリにする
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  if (isPending) return <p>loading</p>;

  //TODO あとで hook form にする
  return (
    <form action={action}>
      <input type="text" name="name" defaultValue={meetupDetail.name} />
      <input
        type="date"
        name="scheduledAt"
        defaultValue={formatDate(meetupDetail.scheduledAt)}
      />
      <button type="submit">送信</button>
    </form>
  );
};
