import { meetupRepository } from "./_logic/repository/meetupRepository";

import type { Result } from "@/type/error/error";
import type { MeetupClientSchema } from "@/validations/private/meetupValidation";

export const updateMeetupService = async (
  meetupId: string,
  userId: string,
  formData: MeetupClientSchema,
): Promise<Result<void>> => {
  const verifyUserOwnedMeetup = await meetupRepository.verifyUserOwnedMeetup(
    userId,
    meetupId,
  );
  if (!verifyUserOwnedMeetup.ok)
    return {
      ok: false,
      error: {
        code: verifyUserOwnedMeetup.error.code,
      },
    };

  const updateResult = await meetupRepository.update(meetupId, formData);
  if (!updateResult.ok)
    return {
      ok: false,
      error: {
        code: updateResult.error.code,
      },
    };
  return {
    ok: true,
    data: undefined,
  };
};
