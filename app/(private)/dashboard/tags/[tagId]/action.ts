"use server";

import { redirect } from "next/navigation";

import type { TagErrors } from "@/type/private/tags/tags";
import type { ActionState } from "@/type/util/action";

import { deleteTagService } from "@/app/(private)/dashboard/tags/[tagId]/deleteTagService";
import { updateTagService } from "@/app/(private)/dashboard/tags/[tagId]/updateTagService";
import { getUser } from "@/auth";
import { tagSchema } from "@/validations/private/tagValidations";

const tagValidation = (formData: FormData) => {
  const rawFormData = {
    name: formData.get("name"),
  };
  return tagSchema.safeParse(rawFormData);
};

export const updateTag = async (
  tagId: string,
  _: ActionState<TagErrors>,
  formData: FormData,
): Promise<ActionState<TagErrors>> => {
  const validatedFields = tagValidation(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: {
        tag: validatedFields.error.name,
      },
    };
  }

  const user = await getUser();
  if (!user)
    return {
      success: false,
      errors: {
        auth: "認証に失敗しました",
      },
    };

  const updateResult = await updateTagService(
    tagId,
    user.id,
    validatedFields.data.name,
  );
  if (!updateResult.ok)
    return {
      success: false,
      errors: {},
    };
  redirect(`/dashboard/tags/${tagId}`);
};

export const deleteTag = async (
  tagId: string,
): Promise<ActionState<TagErrors>> => {
  const user = await getUser();
  if (!user)
    return {
      success: false,
      errors: {
        auth: "認証に失敗しました",
      },
    };
  const deleteResult = await deleteTagService(tagId, user.id);
  if (!deleteResult.ok) {
    return {
      success: false,
      errors: {},
    };
  }

  redirect("/dashboard/tags");
};
