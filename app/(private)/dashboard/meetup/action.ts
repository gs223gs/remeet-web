//作成したらredirect -> dashboard/meetup/[id]/contacts/new
"use server";
import type { MeetupErrors } from "@/type/private/meetup/meetup";
import type { ActionState } from "@/type/util/action";

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

    return {
      success: true,
      errors: {},
    };
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
//read

//delete
