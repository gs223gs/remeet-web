import type { Result } from "@/type/error/error";

import { meetupRepository } from "@/app/(private)/dashboard/meetup/_logic/repository/meetupRepository";
import { getUser } from "@/auth";
import { createMeetupSchema } from "@/validations/private/meetupValidation";

export const createMeetupService = async (
  formData: FormData,
): Promise<Result<{ meetupId: string }>> => {
  try {
    const rawFormData = {
      name: formData.get("name")?.toString() ?? "",
      scheduledAt: formData.get("scheduledAt")?.toString() ?? "",
    };

    const validatedFields = createMeetupSchema.safeParse(rawFormData);
    if (!validatedFields.success)
      return {
        ok: false,
        error: {
          code: "validation",
          message: [],
        },
      };

    const user = await getUser();
    if (!user)
      return {
        ok: false,
        error: {
          code: "validation",
          message: [],
        },
      };

    const createMeetupData = {
      userId: user.id,
      name: validatedFields.data.name,
      scheduledAt: validatedFields.data.scheduledAt,
    };

    const createdMeetupResult = await meetupRepository.create(createMeetupData);
    if (!createdMeetupResult.ok)
      return {
        ok: false,
        error: {
          code: "validation",
          message: [],
        },
      };

    return {
      ok: true,
      data: { meetupId: createdMeetupResult.data.id },
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: {
        code: "unknown",
        message: [""],
      },
    };
  }
};
