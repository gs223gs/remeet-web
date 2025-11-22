import { getTag } from "../_server/server";

import { UpdateTagForm } from "@/components/tag/form/updateTag";

export default async function TagUpdatePage({
  params,
}: {
  params: Promise<{ tagId: string }>;
}) {
  const { tagId } = await params;
  const tagRes = await getTag(tagId);

  if (!tagRes.ok) {
    return <div>tagが取得できませんでした</div>;
  }

  return <UpdateTagForm tag={tagRes.data} />;
}
