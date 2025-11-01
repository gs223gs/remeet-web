import { getTags } from "../_server/server";

import RequiredForm from "@/components/contacts/form/requiredForm";

export default async function CreateContacts({
  params,
}: {
  params: Promise<{ meetupId: string }>;
}) {
  const { meetupId } = await params;
  const tags = await getTags();

  //TODO エラーハンドリングを変える
  if (!tags.ok) return <p>tag取得に失敗しました</p>;
  return <RequiredForm meetupId={meetupId} tags={tags.data} />;
}
