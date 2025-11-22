import { getMeetupDetail } from "../../_server/server";

import { MeetupEditForm } from "@/components/meetup/form/meetupEditForm";

export default async function MeetupUpdatePage({
  params,
}: {
  params: Promise<{ meetupId: string }>;
}) {
  const { meetupId } = await params;
  const res = await getMeetupDetail(meetupId);
  if (!res.ok) {
    return <div>何かしらのエラー</div>;
  }
  return <MeetupEditForm meetupDetail={res.data} />;
}
