"use client";
import { useState } from "react";

import type { MeetupDetail } from "@/type/private/meetup/meetup";

import { MeetupEditForm } from "@/components/meetup/form/meetupEditForm";

type MeetupDetailProps = {
  meetupDetail: MeetupDetail;
  meetupContactsCount: number;
};

export const MeetupOverview = ({
  meetupDetail,
  meetupContactsCount,
}: MeetupDetailProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (isEditing)
    return (
      <MeetupEditForm meetupDetail={meetupDetail} setIsEditing={setIsEditing} />
    );
  return (
    <div>
      <div>id:{meetupDetail.id}</div>
      <div>meetup名: {meetupDetail.name}</div>
      <div>date: {meetupDetail.scheduledAt.toISOString()}</div>
      <div>count:{meetupContactsCount}</div>
      <button onClick={() => setIsEditing(true)}>Meetupの編集</button>
    </div>
  );
};
