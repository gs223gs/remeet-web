import RequiredForm from "@/components/contacts/form/requiredForm";

export default async function CreateContacts({
  params,
}: {
  params: Promise<{ meetupId: string }>;
}) {
  const { meetupId } = await params;
  //TODO tags がモックだから実装する

  return (
    <RequiredForm meetupId={meetupId} tags={[{ id: "dawdaw", name: "aaaa" }]} />
  );
}
