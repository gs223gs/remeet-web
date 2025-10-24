"use server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/auth";
import { ActionState } from "@/type/util/action";
import { ContactsErrors } from "@/type/private/contacts/contacts";
import {
  createContactsSchema,
  CreateContactsSchema,
} from "@/validations/private/contactsValidation";

//TODO 型作成
export const createContacts = async (
  meetupId: string,
  _: ActionState<ContactsErrors>,
  formData: FormData,
): Promise<ActionState<ContactsErrors>> => {
  console.log(formData);
  console.log(formData.getAll("tagId"));
  //TODO formdata 取得
  //TODO validation
  const validatedFields = createContactsSchema.safeParse({
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
  });

  console.log("VALIDATION DATA", validatedFields.data?.name);
  console.log("VALIDATION SUCCESS", validatedFields.success);
  console.log("VALIDATION ERRORS", validatedFields.error);
  try {
    const user = await getUser();
    if (!user)
      return {
        success: false,
        errors: {
          auth: "認証に失敗しました",
        },
      };
    //TODO contact へのinsert
    //TODO contactTag へのinsert

    //TODO prismaで同時に行けるか調べる

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
