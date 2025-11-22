import { UpdateTagForm } from "@/components/tag/form/updateTag";

export default async function TagUpdatePage({
  param,
}: {
  param: Promise<{ tagId: string }>;
}) {
  const { tagId } = await param;
  const tagRes = await getTags(tagId);

  return <UpdateTagForm tag={tagRes.data} />;
}
