"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { useForm } from "react-hook-form";

import type { Tag } from "@/type/private/tags/tags";
import type { CreateContactsSchema } from "@/validations/private/contactsValidation";

import { createContacts } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/action";
import { ContactForm } from "@/components/contacts/form/ContactForm";
import { createContactsFrontSchema } from "@/validations/private/contactsValidation";
type Props = {
  meetupId: string;
  tags: Tag[];
};

export const CreateContactForm = ({ meetupId, tags }: Props) => {
  const createContactsWithMeetupId = createContacts.bind(null, meetupId);

  const [_, action, isPending] = useActionState(
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
    mode: "onChange",
  });

  const isDisabled = !form.formState.isValid || isPending;
  const buttonLabel = isPending
    ? "送信中"
    : form.formState.isValid
      ? "送信"
      : "入力してください";

  return (
    <div>
      <ContactForm
        tags={tags}
        form={form}
        action={action}
        buttonLabel={buttonLabel}
        isDisabled={isDisabled}
      />
    </div>
  );
};
