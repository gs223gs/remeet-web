"use server";
import { redirect } from "next/navigation";

import { deleteContactService } from "./_logic/deleteContactService";
import { updateContactsService } from "./_logic/updateContactsService";

import type { ErrorCode } from "@/type/error/error";
import type { Result } from "@/type/error/error";
import type { Tag } from "@/type/private/tags/tags";
import type { ActionState } from "@/type/util/action";

import { contactValidation } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/contactsValidation";
import { createContactService } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/createContactsService";
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
      error: "validation",
    };

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
      error: createdContactResult.error.code,
    };
  }
  redirect(routes.dashboardMeetupDetail(meetupId));
};

export const updateContacts = async (
  meetupId: string,
  contactId: string,
  _: ActionState<ErrorCode> | null,
  formData: FormData,
): Promise<ActionState<ErrorCode>> => {
  const validatedFields = contactValidation(formData);
  if (!validatedFields.success)
    return {
      success: false,
      error: "validation",
    };

  const user = await getUser();
  if (!user) redirect(routes.login());

  const updateServiceResult = await updateContactsService(
    meetupId,
    contactId,
    user.id,
    validatedFields.data,
  );
  if (!updateServiceResult.ok)
    return {
      success: false,
      error: updateServiceResult.error.code,
    };

  redirect(routes.dashboardMeetupContactDetail(meetupId, contactId));
};
//TODO validation
export const createTag = async (newTag: string): Promise<Result<Tag>> => {
  try {
    const user = await getUser();
    if (!user) redirect(routes.login());

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
export const deleteContact = async (
  contactId: string,
  meetupId: string,
  _: ActionState<ErrorCode> | null,
): Promise<ActionState<ErrorCode>> => {
  const user = await getUser();
  if (!user) redirect(routes.login());

  const deleteServiceResult = await deleteContactService(contactId, user.id);
  if (!deleteServiceResult.ok)
    return {
      success: false,
      error: deleteServiceResult.error.code,
    };

  redirect(routes.dashboardMeetupDetail(meetupId));
};
