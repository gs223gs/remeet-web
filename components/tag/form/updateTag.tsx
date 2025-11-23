"use client";
import { useActionState } from "react";

import type { Tag } from "@/type/private/tags/tags";

import { updateTag } from "@/app/(private)/dashboard/tags/[tagId]/action";

type UpdateTagFormProps = {
  tag: Tag;
};
export const UpdateTagForm = ({ tag }: UpdateTagFormProps) => {
  const updateTagWithId = updateTag.bind(null, tag.id);
  const [state, action, isPending] = useActionState(updateTagWithId, {
    success: false,
    error: {},
  });

  if (isPending) {
    return <div>pending</div>;
  }
  return (
    <form action={action}>
      <div>{state && state.success}</div>
      <input type="text" name="tagName" defaultValue={tag.name} />
      <button type="submit">確定</button>
    </form>
  );
};
