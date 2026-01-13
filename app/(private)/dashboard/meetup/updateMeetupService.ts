import { meetupRepository } from "./_logic/repository/meetupRepository";

import type { Result } from "@/type/error/error";
import type { MeetupClientSchema } from "@/validations/private/meetupValidation";

export const updateMeetupService = async (
  meetupId: string,
  formData: MeetupClientSchema,
): Promise<Result<void>> => {
  const verifyUserOwnedMeetup = await meetupRepository.verifyUserOwnedMeetup(
    meetupId,
    meetupId,
  );
  if (!verifyUserOwnedMeetup)
    return {
      ok: false,
      error: {
        code: "authorization",
        message: [],
      },
    };

  const updateResult = await meetupRepository.update(meetupId, formData);
  if (!updateResult.ok)
    return {
      ok: false,
      error: {
        code: "db_error",
        message: [],
      },
    };
  return {
    ok: true,
    data: undefined,
  };
};
