"use client";
import { useActionState } from "react";

import type { Tag } from "@/type/private/tags/tags";

type UpdateTagFormProps = {
  tag: Tag;
};
export const UpdateTagForm = ({ tag }: UpdateTagFormProps) => {
  const [state, action, isPending] = useActionState();
  return (
    <form action="">
      <input type="text" defaultValue={tag.name} />
      <button type="submit">確定</button>
    </form>
  );
};
