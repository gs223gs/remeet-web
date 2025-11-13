"use client";
import { useState } from "react";

import type { MeetupDetail } from "@/type/private/meetup/meetup";

type MeetupDetailProps = {
  meetupDetail: MeetupDetail;
  meetupContactsCount: number;
};

export const MeetupOverview = ({
  meetupDetail,
  meetupContactsCount,
}: MeetupDetailProps) => {
  "use client";
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (isEditing)
    return (
      <MeetupEdit meetupDetail={meetupDetail} setIsEditing={setIsEditing} />
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

type MeetupEditProps = {
  meetupDetail: MeetupDetail;
  setIsEditing: (state: boolean) => void;
};
const MeetupEdit = ({ meetupDetail, setIsEditing }: MeetupEditProps) => {
  "use client";

  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  return (
    <form>
      <input type="text" defaultValue={meetupDetail.name} />
      <input type="date" defaultValue={formatDate(meetupDetail.scheduledAt)} />
      <button>送信</button>
      <button onClick={() => setIsEditing(false)}>キャンセル</button>
    </form>
  );
};
