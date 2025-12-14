//作成したらredirect -> dashboard/meetup/[id]/contacts/new
"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

import type { MeetupErrors } from "@/type/private/meetup/meetup";
import type { ActionState } from "@/type/util/action";

import { meetupRepository } from "@/app/(private)/dashboard/meetup/_logic/repository/meetupRepository";
import { getOwnedMeetup } from "@/app/(private)/dashboard/meetup/_logic/service/checkMeetupOwner";
import { getUser } from "@/auth";
import { prisma } from "@/lib/prisma";
import { routes } from "@/util/routes";
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

    const createMeetupData = {
      userId: user.id,
      name: validatedFields.data.name,
      scheduledAt: validatedFields.data.scheduledAt,
    };

    const createdMeetupResult = await meetupRepository.create(createMeetupData);
    if (!createdMeetupResult.ok) {
      return {
        success: false,
        errors: {
          server: "server error",
        },
      };
    }
    redirect(routes.dashboardMeetupDetail(createdMeetupResult.data.id));
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
  try {
    const user = await getUser();
    if (!user)
      return {
        success: false,
        errors: {
          auth: "認証に失敗しました",
        },
      };
    //Meetup OwnershipCheck
    /**
     * TODO リファクタリング
     * return が何を表しているのかわからない
     * getOwnedMeetup内で直接prismaを呼び出しているので責務が崩れている
     */
    const meetupOwnershipResult = await getOwnedMeetup(meetupId, user.id);
    if (!meetupOwnershipResult.ok) {
      return {
        success: false,
        errors: {
          auth: "認証に失敗しました",
        },
      };
    }

    //deleteMeetup
    const deletedMeetupResult = await meetupRepository.delete(
      meetupId,
      user.id,
    );
    if (!deletedMeetupResult.ok) {
      return {
        success: false,
        errors: {
          server: "server error",
        },
      };
    }

    redirect("/dashboard/meetup");
  } catch (error) {
    console.error(error);
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      errors: {
        server: "server error",
      },
    };
  }
};
