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
  const [_, action, isPending] = useActionState(
    deleteContactWithMeetupIdAndContactId,
    null,
  );

  return (
    <form action={action} className="space-y-3">
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
