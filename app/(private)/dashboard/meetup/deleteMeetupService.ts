import type { Result } from "@/type/error/error";

import { meetupRepository } from "@/app/(private)/dashboard/meetup/_logic/repository/meetupRepository";

export const deleteMeetupService = async (
  userId: string,
  meetupId: string,
): Promise<Result<void>> => {
  const verifyUserOwnedMeetup = await meetupRepository.verifyUserOwnedMeetup(
    userId,
    meetupId,
  );
  if (!verifyUserOwnedMeetup.ok)
    return {
      ok: false,
      error: {
        code: "authorization",
      },
    };

  const deleteMeetupResult = await meetupRepository.delete(meetupId, userId);
  if (!deleteMeetupResult.ok)
    return {
      ok: false,
      error: {
        code: "db_error",
      },
    };

  return {
    ok: true,
    data: undefined,
  };
};
