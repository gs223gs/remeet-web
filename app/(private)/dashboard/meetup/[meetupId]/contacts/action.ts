"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

import type { ErrorCode, Result } from "@/type/error/error";
import type {
  ContactsErrors,
  CreateContactLink,
} from "@/type/private/contacts/contacts";
import type { Tag } from "@/type/private/tags/tags";
import type { ActionState } from "@/type/util/action";
import type { LinkType } from "@prisma/client";

import { contactValidation } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/contactsValidation";
import { createContactService } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/createContactsService";
import { contactRepository } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/repository/contactRepository";
import { getOwnedContact } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/service/checkContactOwner";
import { getUser } from "@/auth";
import { prisma } from "@/lib/prisma";
import { routes } from "@/util/routes";
export const createContacts = async (
  meetupId: string,
  _: ActionState<ErrorCode> | null,
  formData: FormData,
): Promise<ActionState<ErrorCode>> => {
  try {
    const user = await getUser();
    if (!user) redirect(routes.login());

    const createdContactResult = await createContactService(
      meetupId,
      user.id,
      formData,
    );
    if (!createdContactResult.ok) {
      return {
        success: false,
        errors: createdContactResult.error.code,
      };
    }
    redirect(routes.dashboardMeetupDetail(meetupId));
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      success: false,
      errors: "unknown",
    };
  }
};

//TODO validation
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
    console.error(error);
    return false;
  }
};

export const updateContacts = async (
  meetupId: string,
  contactId: string,
  _: ActionState<ContactsErrors>,
  formData: FormData,
): Promise<ActionState<ContactsErrors>> => {
  const user = await getUser();
  if (!user)
    return {
      success: false,
      errors: {
        auth: "認証に失敗しました",
      },
    };

  const validatedFields = contactValidation(formData);

  if (!validatedFields.success)
    //TODO return の値を変更しろ
    return {
      success: false,
      errors: {
        auth: "認証に失敗しました",
      },
    };

  try {
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
      await tx.contact.update({
        where: { id: contactId, userId: user.id },
        data: {
          userId: user.id,
          name: validatedFields.data.name,
          company: validatedFields.data.company,
          role: validatedFields.data.role,
          description: validatedFields.data.description,
        },
      });

      await tx.contactLink.deleteMany({
        where: { contactId: contactId },
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
          url: validatedFields.data.productUrl,
          handle: validatedFields.data.productHandle,
        },
      ] as const;

      const filterInsertLinks: CreateContactLink[] = insertLinks.flatMap((l) =>
        l.url
          ? [
              {
                contactId: contactId,
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

      await tx.contactTag.deleteMany({
        where: { contactId: contactId },
      });

      //TODO not elegantですね
      if (tags?.length) {
        const insertTags = tags.map((t) => {
          return { contactId: contactId, tagId: t };
        });
        await tx.contactTag.createMany({
          data: insertTags,
        });
      }
    });

    redirect(`/dashboard/meetup/${meetupId}/contacts/${contactId}`);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      success: false,
      errors: {},
    };
  }
};

export const deleteContact = async (
  contactId: string,
  meetupId: string,
  _: ActionState<ContactsErrors>,
): Promise<ActionState<ContactsErrors>> => {
  const user = await getUser();
  if (!user)
    return {
      success: false,
      errors: {
        auth: "認証に失敗しました",
      },
    };

  const contactOwnershipResult = await getOwnedContact(contactId, user.id);
  if (!contactOwnershipResult.ok) {
    return {
      success: false,
      errors: {
        auth: "認証に失敗しました",
      },
    };
  }

  const isDeleted = await contactRepository.delete(
    contactOwnershipResult.data.contactId,
    contactOwnershipResult.data.userId,
  );
  if (!isDeleted.ok) {
    return {
      success: false,
      errors: isDeleted.error,
    };
  }

  redirect(`/dashboard/meetup/${meetupId}`);
};
