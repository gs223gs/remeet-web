"use server";

import { redirect } from "next/navigation";

import type { TagErrors } from "@/type/private/tags/tags";
import type { ActionState } from "@/type/util/action";

import { getUser } from "@/auth";
import { prisma } from "@/lib/prisma";
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
  try {
    const user = await getUser();
    if (!user)
      return {
        success: false,
        errors: {
          auth: "認証に失敗しました",
        },
      };

    await prisma.tag.update({
      where: { id: tagId, userId: user.id },
      data: { name: validatedFields.data.name },
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errors: {
        server: "server error",
      },
    };
  }
  redirect(`/dashboard/tags/${tagId}`);
};

export const deleteTag = async (
  tagId: string,
): Promise<ActionState<TagErrors>> => {
  try {
    const user = await getUser();
    if (!user)
      return {
        success: false,
        errors: {
          auth: "認証に失敗しました",
        },
      };
    await prisma.tag.delete({
      where: { id: tagId, userId: user.id },
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errors: {
        server: "server error",
      },
    };
  }
  redirect("/dashboard/tags");
};
