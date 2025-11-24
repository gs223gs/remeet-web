//作成したらredirect -> dashboard/meetup/[id]/contacts/new
"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

import type { MeetupErrors } from "@/type/private/meetup/meetup";
import type { ActionState } from "@/type/util/action";

import { deleteMeetUpRecord } from "@/app/(private)/dashboard/meetup/_logic/delete/repository";
import { getUser } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createMeetupSchema } from "@/validations/private/meetupValidation";

export const createMeetup = async (
  _: ActionState<MeetupErrors>,
  formData: FormData,
): Promise<ActionState<MeetupErrors>> => {
  const rawFormData = {
    name: formData.get("name") as string,
    scheduledAt: formData.get("scheduledAt") as string,
  };

  const validatedFields = createMeetupSchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
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

    await prisma.meetup.create({
      data: {
        userId: user.id,
        name: validatedFields.data.name,
        scheduledAt: validatedFields.data.scheduledAt,
      },
    });
    return { success: true, errors: {} };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errors: {
        server: "server error",
      },
    };
  }
};

//update
export const updateMeetup = async (
  meetupId: string,
  _: ActionState<MeetupErrors>,
  formData: FormData,
): Promise<ActionState<MeetupErrors>> => {
  const rawFormData = {
    name: formData.get("name") as string,
    scheduledAt: formData.get("scheduledAt") as string,
  };

  const validatedFields = createMeetupSchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
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

    const meetup = await prisma.meetup.findFirst({
      where: { id: meetupId, userId: user.id },
    });

    if (!meetup) {
      return {
        success: false,
        errors: {
          server: "server error",
        },
      };
    }

    await prisma.meetup.update({
      where: {
        id: meetup.id,
      },
      data: {
        name: validatedFields.data.name,
        scheduledAt: validatedFields.data.scheduledAt,
      },
    });

    /**
     *!本当はredirectにしたくない
     *?meetupページにredirectしたらcontactsが再renderされてしまうからパフォーマンスが落ちる
     ただ，一つのmeetupに参加するのはせいぜい50人，そこから話したとしても10~20だろう
     (楽観的UIの実装, 学習, 可読性低下) によるコストを考えたら再renderの方がいいと考えた
     
     ** 11/15 追記
    そもそもの話，contactsを取得しているのは何か？
    getMeetupDetailSummary()で取得している
    meetupのデータとcontactsのデータを同時に取得して返している
    この時点でcontactsは再renderされるのは確定．
    そして，redirectの仕様はページ全体の再取得RSCの再度実行

    GPT的に言わせればこのままでいいらしいけど研究対象とします
     */
    redirect(`/dashboard/meetup/${meetup.id}`);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);

    return {
      success: false,
      errors: {
        server: "server error",
      },
    };
  }
};
//read

//delete

export const deleteMeetup = async (
  meetupId: string,
  _: ActionState<MeetupErrors>,
): Promise<ActionState<MeetupErrors>> => {
  //認可
  const user = await getUser();
  if (!user)
    return {
      success: false,
      errors: {
        auth: "認証に失敗しました",
      },
    };
  const deleteResult = await deleteMeetUpRecord(meetupId, user.id);
  if (!deleteResult.ok) {
    return {
      success: false,
      errors: {
        server: "server error",
      },
    };
  }

  //repository

  redirect("/dashboard/meetup");
};
