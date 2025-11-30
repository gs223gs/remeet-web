import Link from "next/link";

import { DeleteMeetupForm } from "./form/deleteMeetupForm";

import type { MeetupDetail } from "@/type/private/meetup/meetup";

type MeetupDetailProps = {
  meetupDetail: MeetupDetail;
  meetupContactsCount: number;
};

export const MeetupOverview = ({
  meetupDetail,
  meetupContactsCount,
}: MeetupDetailProps) => {
  return (
    <div>
      <div>id:{meetupDetail.id}</div>
      <div>meetup名: {meetupDetail.name}</div>
      <div>date: {meetupDetail.scheduledAt.toISOString()}</div>
      <div>count:{meetupContactsCount}</div>
      <Link href={`/dashboard/meetup/${meetupDetail.id}/edit`}>編集</Link>
      <DeleteMeetupForm meetupId={meetupDetail.id} />
    </div>
  );
};
