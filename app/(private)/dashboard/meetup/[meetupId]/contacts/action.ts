"use server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/auth";
import { ActionState } from "@/type/util/action";
import { ContactsErrors } from "@/type/private/contacts/contacts";

//TODO 型作成
export const createContacts = async (
  meetupId: string,
  _: ActionState<ContactsErrors>,
  formData: FormData,
): Promise<ActionState<ContactsErrors>> => {
  //TODO formdata 取得
  //TODO validation

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
  } catch (error) {
    console.log(error);
  }
};
