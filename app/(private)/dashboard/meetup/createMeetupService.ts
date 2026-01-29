import type { Result } from "@/type/error/error";

import { meetupRepository } from "@/app/(private)/dashboard/meetup/_logic/repository/meetupRepository";

export const createMeetupService = async (
  userId: string,
  validatedFields: {
    meetupName: string;
    scheduledAt: Date;
  },
): Promise<Result<{ meetupId: string }>> => {
  const createMeetupData = {
    userId: userId,
    name: validatedFields.meetupName,
    scheduledAt: validatedFields.scheduledAt,
  };

  const createdMeetupResult = await meetupRepository.create(createMeetupData);
  if (!createdMeetupResult.ok)
    return {
      ok: false,
      error: {
        code: createdMeetupResult.error.code,
      },
    };

  return {
    ok: true,
    data: { meetupId: createdMeetupResult.data.id },
  };
};
