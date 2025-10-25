"use server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/auth";
import { ActionState } from "@/type/util/action";
import {
  ContactsErrors,
  CreateContactLink,
} from "@/type/private/contacts/contacts";
import { createContactsActionSchema } from "@/validations/private/contactsValidation";
import { LinkType } from "@prisma/client";

export const createContacts = async (
  meetupId: string,
  _: ActionState<ContactsErrors>,
  formData: FormData,
): Promise<ActionState<ContactsErrors>> => {
  const rawFormData = {
    name: formData.get("name"),
    company: formData.get("company"),
    role: formData.get("role"),
    description: formData.get("description"),
    tags: formData.getAll("tags"),
    githubHandle: formData.get("githubHandle"),
    githubId: formData.get("githubId"),
    twitterHandle: formData.get("twitterHandle"),
    twitterId: formData.get("twitterId"),
    websiteHandle: formData.get("websiteHandle"),
    websiteUrl: formData.get("websiteUrl"),
    productHandle: formData.get("productHandle"),
    productUrl: formData.get("productUrl"),
    otherHandle: formData.get("otherHandle"),
    other: formData.get("other"),
  };
  const validatedFields = createContactsActionSchema.safeParse(rawFormData);

  if (!validatedFields.success)
    return {
      success: false,
      errors: {
        auth: "認証に失敗しました",
      },
    };

  try {
    const user = await getUser();
    if (!user)
      return {
        success: false,
        errors: {
          auth: "認証に失敗しました",
        },
      };
    const isVerifyMeetup = await prisma.meetup.findFirst({
      where: { userId: user.id, id: meetupId },
      select: { id: true },
    });

    //TODO ここあとで整える
    if (!isVerifyMeetup)
      return {
        success: false,
        errors: {
          auth: "認証に失敗しました",
        },
      };

    //TODO transaction でやるよね
    //TODO contact へのinsert
    //TODO contactTag へのinsert バルクinsert
    //TODO prismaで同時に行けるか調べる => いけた
    //TODO TAG の存在確認 findMany
    //TODO linkの作成 バルクinsert
    const isVerifyTags = await verifyTags(validatedFields.data?.tags);

    await prisma.$transaction(async (tx) => {
      const createdContact = await tx.contact.create({
        data: {
          userId: user.id,
          name: validatedFields.data.name,
          company: validatedFields.data.company,
          role: validatedFields.data.role,
          description: validatedFields.data.description,
        },
      });

      await tx.contactMeetup.create({
        data: {
          contactId: createdContact.id,
          meetupId: meetupId,
        },
      });

      const insertLinks = [
        {
          type: "GITHUB" as LinkType,
          url: validatedFields.data.githubId,
          handle: validatedFields.data.githubHandle,
        },
        {
          type: "TWITTER" as LinkType,
          url: validatedFields.data.twitterId,
          handle: validatedFields.data.twitterHandle,
        },
        {
          type: "WEBSITE" as LinkType,
          url: validatedFields.data.websiteUrl,
          handle: validatedFields.data.websiteHandle,
        },
        {
          type: "OTHER" as LinkType,
          url: validatedFields.data.other,
          handle: validatedFields.data.otherHandle,
        },
        {
          type: "PRODUCT" as LinkType,
          url: validatedFields.data.productHandle,
          handle: validatedFields.data.productHandle,
        },
      ];

      const filterInsertLinks: CreateContactLink[] = insertLinks.flatMap((l) =>
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

      await tx.contactLink.createMany({});

      if (isVerifyTags) await tx.contactTag.create({});
    });

    return {
      success: true,
      errors: {},
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      errors: {},
    };
  }
};

const verifyTags = async (tags: string[] | undefined): Promise<boolean> => {
  if (!tags) return false;

  try {
    const fetchTags = await prisma.tag.findMany({
      where: {
        id: {
          in: tags,
        },
      },
    });

    if (fetchTags.length !== tags.length) return false;

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
