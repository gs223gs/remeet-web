"use client";
import { useActionState } from "react";

import { deleteContact } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/action";

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
  return (
    <form action={action}>
      {state && state.errors.server}
      {isPending ? <p>削除中</p> : <button type="submit">削除する</button>}
    </form>
  );
};
