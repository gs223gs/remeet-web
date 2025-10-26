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
import { Result } from "@/type/error/error";
import { Tag } from "@/type/private/tags/tags";

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
    //TODO リファクタリング対象
    //ちょっと不愉快
    const tags = validatedFields.data.tags;
    if (tags?.length) {
      const isVerifyTags = await verifyTags(tags, user.id);
      if (!isVerifyTags) {
        return {
          success: false,
          errors: { auth: "認証に失敗しました" },
        };
      }
    }
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

      //TODO ここ本当に変えたい 冗長すぎる
      //? type ContactsLink の url:string を undefined 許容にすれば解決だけど，そのために型を増やしたくない && DBと合わないから嫌だ
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
          url: validatedFields.data.productUrl,
          handle: validatedFields.data.productHandle,
        },
      ] as const;

      const filterInsertLinks: CreateContactLink[] = insertLinks.flatMap((l) =>
        l.url
          ? [
              {
                contactId: createdContact.id,
                type: l.type,
                url: l.url,
                ...(l.handle ? { handle: l.handle } : {}),
              },
            ]
          : [],
      );

      if (filterInsertLinks.length) {
        await tx.contactLink.createMany({ data: filterInsertLinks });
      }
      //TODO not elegantですね
      if (tags?.length) {
        const insertTags = tags.map((t) => {
          return { contactId: createdContact.id, tagId: t };
        });
        await tx.contactTag.createMany({
          data: insertTags,
        });
      }
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

export const createTag = async (newTag: string): Promise<Result<Tag>> => {
  try {
    const user = await getUser();
    if (!user)
      return {
        ok: false,
        error: {
          code: "unauthenticated",
          message: ["情報取得に失敗しました"],
        },
      };

    const createdTag = await prisma.tag.create({
      data: {
        userId: user.id,
        name: newTag,
      },
    });

    return {
      ok: true,
      data: createdTag,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: {
        code: "db_error",
        message: ["タグの作成に失敗しました"],
      },
    };
  }
};
/**
 *
 * @param tags
 * @returns boolean
 *
 * @description フロントから送られてきたタグをDBで検証する関数 フロントから送られてきたタグの数とDB fetchしたタグの数が一致していれば true を返す
 */
const verifyTags = async (tags: string[], userId: string): Promise<boolean> => {
  try {
    const fetchTags = await prisma.tag.findMany({
      where: {
        userId: userId,
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
