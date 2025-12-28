"use client";
import { useActionState } from "react";

import { deleteContact } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/action";
import { Button } from "@/components/ui/button";

type Props = {
  contactId: string;
  meetupId: string;
};

export const DeleteContactForm = ({ contactId, meetupId }: Props) => {
  const deleteContactWithMeetupIdAndContactId = deleteContact.bind(
    null,
    contactId,
    meetupId,
  );
  const [state, action, isPending] = useActionState(
    deleteContactWithMeetupIdAndContactId,
    {
      success: false,
      errors: {},
    },
  );

  const errorMessage =
    state?.errors?.auth ??
    (state?.errors?.server
      ? "削除に失敗しました。時間をおいて再度お試しください。"
      : undefined);

  return (
    <form action={action} className="space-y-3">
      {errorMessage ? (
        <p className="text-sm text-red-500" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <Button
        type="submit"
        size="sm"
        variant="ghost"
        className="w-full border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
        disabled={isPending}
      >
        {isPending ? "削除中..." : "このコンタクトを削除"}
      </Button>
    </form>
  );
};
