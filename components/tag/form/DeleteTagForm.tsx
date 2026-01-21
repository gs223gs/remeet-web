"use client";
import { useActionState } from "react";

import { deleteTag } from "@/app/(private)/dashboard/tags/[tagId]/action";
import { Button } from "@/components/ui/button";

type Props = {
  tagId: string;
};

export const DeleteTagForm = ({ tagId }: Props) => {
  const deleteTagWithTagId = deleteTag.bind(null, tagId);
  const [_, action, isPending] = useActionState(deleteTagWithTagId, null);

  return (
    <form action={action} className="w-full space-y-2 sm:w-auto">
      <Button
        type="submit"
        size="sm"
        variant="ghost"
        className="w-full border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 sm:w-auto"
        disabled={isPending}
      >
        {isPending ? "削除中..." : "タグを削除"}
      </Button>
    </form>
  );
};
