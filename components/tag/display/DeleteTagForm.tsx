"use client";
import { useActionState } from "react";

import { deleteTag } from "@/app/(private)/dashboard/tags/[tagId]/action";
import { Button } from "@/components/ui/button";

type Props = {
  tagId: string;
};

export const DeleteTagForm = ({ tagId }: Props) => {
  const deleteTagWithTagId = deleteTag.bind(null, tagId);
  const [state, action, isPending] = useActionState(deleteTagWithTagId, {
    success: false,
    errors: {},
  });

  const errorMessage =
    state?.errors?.auth ??
    (state?.errors?.server
      ? "削除に失敗しました。時間をおいて再度お試しください。"
      : undefined);

  return (
    <form action={action} className="w-full space-y-2 sm:w-auto">
      {errorMessage ? (
        <p className="text-xs text-red-500" role="alert">
          {errorMessage}
        </p>
      ) : null}
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
