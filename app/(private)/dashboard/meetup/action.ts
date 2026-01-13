//作成したらredirect -> dashboard/meetup/[id]/contacts/new
"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

import { createMeetupService } from "./createMeetupService";
import { updateMeetupService } from "./updateMeetupService";

import type { MeetupErrors } from "@/type/private/meetup/meetup";
import type { ActionState } from "@/type/util/action";

import { meetupRepository } from "@/app/(private)/dashboard/meetup/_logic/repository/meetupRepository";
import { getOwnedMeetup } from "@/app/(private)/dashboard/meetup/_logic/service/checkMeetupOwner";
import { getUser } from "@/auth";
import { routes } from "@/util/routes";
import { createMeetupSchema } from "@/validations/private/meetupValidation";

//TODO v1.2.2 で refactoring 対象 error message
export const createMeetup = async (
  _: ActionState<MeetupErrors>,
  formData: FormData,
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

    const createdMeetupResult = await createMeetupService(formData);
    if (!createdMeetupResult.ok)
      return {
        success: false,
        errors: {},
      };

    redirect(routes.dashboardMeetupDetail(createdMeetupResult.data.meetupId));
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

//TODO v1.2.2 で refactoring 対象 error message
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
  if (!validatedFields.success)
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };

  try {
    const user = await getUser();
    if (!user)
      return {
        success: false,
        errors: {
          auth: "認証に失敗しました",
        },
      };

    const updateServiceResult = await updateMeetupService(meetupId, {
      name: validatedFields.data.name,
      scheduledAt: validatedFields.data.scheduledAt,
    });

    if (!updateServiceResult)
      return {
        success: false,
        errors: {
          server: "server error",
        },
      };

    redirect(`/dashboard/meetup/${meetupId}`);
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

//TODO v1.2.1 で refactoring 対象
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
