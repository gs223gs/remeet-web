"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { useForm } from "react-hook-form";

import type { ContactsDetailDTO } from "@/type/private/contacts/contacts";
import type { Tag } from "@/type/private/tags/tags";
import type { LinkType } from "@prisma/client";

import { updateContacts } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/action";
import { ContactForm } from "@/components/contacts/form/ContactForm";
import {
  createContactsFrontSchema,
  type CreateContactsSchema,
} from "@/validations/private/contactsValidation";

type Props = {
  meetupId: string;
  tags: Tag[];
  contactsDetail: ContactsDetailDTO;
};

export const ContactsUpdateForm = ({
  contactsDetail,
  tags,
  meetupId,
}: Props) => {
  const updateContactsWithMeetupId = updateContacts.bind(
    null,
    meetupId,
    contactsDetail.id,
  );

  //Links を個別に抽出
  const findLinkByType = (type: LinkType) =>
    contactsDetail.links?.find((link) => link.type === type);

  const githubLink = findLinkByType("GITHUB");
  const twitterLink = findLinkByType("TWITTER");
  const websiteLink = findLinkByType("WEBSITE");
  const productLink = findLinkByType("PRODUCT");
  const otherLink = findLinkByType("OTHER");

  const form = useForm<CreateContactsSchema>({
    resolver: zodResolver(createContactsFrontSchema),
    defaultValues: {
      name: contactsDetail.name ?? "",
      company: contactsDetail.company ?? "",
      role: contactsDetail.role ?? "",
      description: contactsDetail.description ?? "",
      tags: contactsDetail.tags?.map((tag) => tag.id) ?? [],
      githubHandle: githubLink?.handle ?? "",
      githubId: githubLink?.url ?? "",
      twitterHandle: twitterLink?.handle ?? "",
      twitterId: twitterLink?.url ?? "",
      websiteHandle: websiteLink?.handle ?? "",
      websiteUrl: websiteLink?.url ?? "",
      productHandle: productLink?.handle ?? "",
      productUrl: productLink?.url ?? "",
      otherHandle: otherLink?.handle ?? "",
      other: otherLink?.url ?? "",
    },
    // Actionとの併用のため focus が外れたらエラーを出す
    mode: "onChange",
  });

  const [_, action, isPending] = useActionState(
    updateContactsWithMeetupId,
    null,
  );

  const isDisabled = !form.formState.isValid || isPending;
  const buttonLabel = isPending
    ? "更新中"
    : form.formState.isValid
      ? "更新する"
      : "入力してください";

  return (
    <div>
      <ContactForm
        tags={tags}
        form={form}
        action={action}
        buttonLabel={buttonLabel}
        isDisabled={isDisabled}
        isOpenLinkFields={true}
      />
    </div>
  );
};
