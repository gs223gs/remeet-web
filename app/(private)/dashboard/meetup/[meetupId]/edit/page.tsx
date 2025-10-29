import UpdateMeetupForm from "@/components/contacts/form/updateMeetupForm";

export default async function MeetupEdit({
  params,
}: {
  params: Promise<{ meetupId: string }>;
}) {
  const { meetupId } = await params;

  return <UpdateMeetupForm meetupId={meetupId} />;
}
