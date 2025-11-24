"use client";
import { useActionState } from "react";

import { deleteTag } from "@/app/(private)/dashboard/tags/[tagId]/action";

type DeleteTagFormProps = {
  tagId: string;
};
export function DeleteTagForm({ tagId }: DeleteTagFormProps) {
  const deleteTagWithTagId = deleteTag.bind(null, tagId);
  const [state, action, isPending] = useActionState(deleteTagWithTagId, {
    success: false,
    errors: {},
  });

  if (isPending) return <div>isPending</div>;
  return (
    <form action={action}>
      {state.errors.server}
      <button>削除する</button>
    </form>
  );
}
