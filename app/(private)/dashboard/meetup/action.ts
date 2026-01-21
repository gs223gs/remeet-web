//作成したらredirect -> dashboard/meetup/[id]/contacts/new
"use server";

import { redirect } from "next/navigation";

import { createMeetupService } from "./createMeetupService";
import { deleteMeetupService } from "./deleteMeetupService";
import { updateMeetupService } from "./updateMeetupService";

import type { ErrorCode } from "@/type/error/error";
import type { ActionState } from "@/type/util/action";

import { getUser } from "@/auth";
import { routes } from "@/util/routes";
import { createMeetupSchema } from "@/validations/private/meetupValidation";

export const createMeetup = async (
  _: ActionState<ErrorCode> | null,
  formData: FormData,
): Promise<ActionState<ErrorCode>> => {
  const rawFormData = {
    name: formData.get("name")?.toString() ?? "",
    scheduledAt: formData.get("scheduledAt")?.toString() ?? "",
  };

  const validatedFields = createMeetupSchema.safeParse(rawFormData);
  if (!validatedFields.success)
    return {
      success: false,
      error: "validation",
    };

  const user = await getUser();
  if (!user) redirect(routes.login());

  const createdMeetupResult = await createMeetupService(user.id, {
    meetupName: validatedFields.data.name,
    scheduledAt: validatedFields.data.scheduledAt,
  });
  if (!createdMeetupResult.ok)
    return {
      success: false,
      error: createdMeetupResult.error.code,
    };

  redirect(routes.dashboardMeetupDetail(createdMeetupResult.data.meetupId));
};

export const updateMeetup = async (
  meetupId: string,
  _: ActionState<ErrorCode> | null,
  formData: FormData,
): Promise<ActionState<ErrorCode>> => {
  const rawFormData = {
    name: formData.get("name") as string,
    scheduledAt: formData.get("scheduledAt") as string,
  };

  const validatedFields = createMeetupSchema.safeParse(rawFormData);
  if (!validatedFields.success)
    return {
      success: false,
      error: "validation",
    };

  const user = await getUser();
  if (!user) redirect(routes.login());

  const updateServiceResult = await updateMeetupService(meetupId, user.id, {
    name: validatedFields.data.name,
    scheduledAt: validatedFields.data.scheduledAt,
  });

  if (!updateServiceResult.ok)
    return {
      success: false,
      error: updateServiceResult.error.code,
    };

  redirect(`/dashboard/meetup/${meetupId}`);
};
export const deleteMeetup = async (
  meetupId: string,
  _: ActionState<ErrorCode> | null,
): Promise<ActionState<ErrorCode>> => {
  const user = await getUser();
  if (!user) redirect(routes.login());

  const deletedMeetupResult = await deleteMeetupService(user.id, meetupId);
  if (!deletedMeetupResult.ok) {
    return {
      success: false,
      error: deletedMeetupResult.error.code,
    };
  }

  redirect(routes.dashboardMeetupList());
};
