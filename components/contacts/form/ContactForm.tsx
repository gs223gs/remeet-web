"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { useForm } from "react-hook-form";

import type { Tag } from "@/type/private/tags/tags";
import type { CreateContactsSchema } from "@/validations/private/contactsValidation";

import { createContacts } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/action";
import { CreateContactForm } from "@/components/contacts/form/CreateContactForm";
import { ServerErrorCard } from "@/components/util/server-error-card";
import { createContactsFrontSchema } from "@/validations/private/contactsValidation";
type Props = {
  meetupId: string;
  tags: Tag[];
};

export const ContactForm = ({ meetupId, tags }: Props) => {
  const createContactsWithMeetupId = createContacts.bind(null, meetupId);

  const [state, action, isPending] = useActionState(
    createContactsWithMeetupId,
    null,
  );

  const form = useForm<CreateContactsSchema>({
    resolver: zodResolver(createContactsFrontSchema),
    defaultValues: {
      name: "",
      company: "",
      role: "",
      description: "",
      tags: [],
      twitterHandle: "",
      twitterId: "",
      websiteHandle: "",
      websiteUrl: "",
      githubHandle: "",
      githubId: "",
      productHandle: "",
      productUrl: "",
      otherHandle: "",
      other: "",
    },
    //Actionとの併用のためfocus が外れたらエラーを出す
    mode: "onBlur",
  });

  return (
    <div>
      {state?.errors === "unknown" && <ServerErrorCard />}
      <CreateContactForm
        tags={tags}
        form={form}
        action={action}
        isPending={isPending}
      />
    </div>
  );
};
