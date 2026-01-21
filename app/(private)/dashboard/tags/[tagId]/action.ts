"use server";

import { redirect } from "next/navigation";

import type { ErrorCode } from "@/type/error/error";
import type { ActionState } from "@/type/util/action";

import { deleteTagService } from "@/app/(private)/dashboard/tags/[tagId]/deleteTagService";
import { updateTagService } from "@/app/(private)/dashboard/tags/[tagId]/updateTagService";
import { getUser } from "@/auth";
import { routes } from "@/util/routes";
import { tagSchema } from "@/validations/private/tagValidations";

const tagValidation = (formData: FormData) => {
  const rawFormData = {
    name: formData.get("name"),
  };
  return tagSchema.safeParse(rawFormData);
};

export const updateTag = async (
  tagId: string,
  _: ActionState<ErrorCode> | null,
  formData: FormData,
): Promise<ActionState<ErrorCode>> => {
  const validatedFields = tagValidation(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "validation",
    };
  }

  const user = await getUser();
  if (!user) redirect(routes.login());

  const updateResult = await updateTagService(
    tagId,
    user.id,
    validatedFields.data.name,
  );
  if (!updateResult.ok)
    return {
      success: false,
      error: updateResult.error.code,
    };
  redirect(routes.dashboardTagDetail(tagId));
};

export const deleteTag = async (
  tagId: string,
): Promise<ActionState<ErrorCode>> => {
  const user = await getUser();
  if (!user) redirect(routes.login());
  const deleteResult = await deleteTagService(tagId, user.id);
  if (!deleteResult.ok) {
    return {
      success: false,
      error: deleteResult.error.code,
    };
  }

  redirect(routes.dashboardTags());
};
