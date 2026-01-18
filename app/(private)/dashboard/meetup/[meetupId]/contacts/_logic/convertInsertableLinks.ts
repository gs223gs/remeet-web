import type { ContactsFormData } from "@/type/private/contacts/contacts";
import type { LinkType } from "@prisma/client";

export const convertInsertableLinks = (validatedFields: ContactsFormData) => {
  const linkFields = [
    {
      type: "GITHUB" as LinkType,
      url: validatedFields.githubId,
      handle: validatedFields.githubHandle,
    },
    {
      type: "TWITTER" as LinkType,
      url: validatedFields.twitterId,
      handle: validatedFields.twitterHandle,
    },
    {
      type: "WEBSITE" as LinkType,
      url: validatedFields.websiteUrl,
      handle: validatedFields.websiteHandle,
    },
    {
      type: "OTHER" as LinkType,
      url: validatedFields.other,
      handle: validatedFields.otherHandle,
    },
    {
      type: "PRODUCT" as LinkType,
      url: validatedFields.productUrl,
      handle: validatedFields.productHandle,
    },
  ] as const;

  return linkFields.flatMap((l) =>
    l.url
      ? [
          {
            type: l.type,
            url: l.url,
            ...(l.handle ? { handle: l.handle } : {}),
          },
        ]
      : [],
  );
};
