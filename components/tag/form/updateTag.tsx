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
    errors: {},
  });

  if (isPending) {
    return <div>pending</div>;
  }
  return (
    <form action={action}>
      {state.errors.id}
      {state.errors.auth}
      {state.errors.server}
      <input type="text" name="name" defaultValue={tag.name} />
      {state.errors.tag}
      <button type="submit">確定</button>
    </form>
  );
};
