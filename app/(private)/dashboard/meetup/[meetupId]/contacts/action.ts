"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

import { updateContactsService } from "./_logic/updateContactsService";

import type { ErrorCode } from "@/type/error/error";
import type { Result } from "@/type/error/error";
import type { ContactsErrors } from "@/type/private/contacts/contacts";
import type { Tag } from "@/type/private/tags/tags";
import type { ActionState } from "@/type/util/action";

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
  const validatedFields = contactValidation(formData);

  if (!validatedFields.success)
    return {
      success: false,
      errors: "validation",
    };

  try {
    const user = await getUser();
    if (!user) redirect(routes.login());

    const createdContactResult = await createContactService(
      meetupId,
      user.id,
      validatedFields.data,
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

//TODO v1.2.1 で refactoring 対象
export const updateContacts = async (
  meetupId: string,
  contactId: string,
  _: ActionState<ContactsErrors> | null,
  formData: FormData,
): Promise<ActionState<ErrorCode>> => {
  const validatedFields = contactValidation(formData);
  if (!validatedFields.success)
    //TODO return の値を変更しろ
    return {
      success: false,
      errors: "validation",
    };

  const user = await getUser();
  if (!user)
    return {
      success: false,
      errors: "unauthenticated",
    };

  const updateServiceResult = await updateContactsService(
    meetupId,
    contactId,
    user.id,
    validatedFields.data,
  );
  if (!updateServiceResult.ok)
    return {
      success: false,
      errors: updateServiceResult.error.code,
    };

  redirect(`/dashboard/meetup/${meetupId}/contacts/${contactId}`);
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
//TODO v1.2.1 で refactoring 対象
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
