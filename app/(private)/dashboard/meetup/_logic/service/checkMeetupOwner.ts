import type { MigrationResult } from "@/type/error/error";
import type {
  MeetupErrors,
  MeetupOwnershipDTO,
} from "@/type/private/meetup/meetup";

import { prisma } from "@/lib/prisma";

export const getOwnedMeetup = async (
  meetupId: string,
  userId: string,
): Promise<MigrationResult<MeetupOwnershipDTO, MeetupErrors>> => {
  try {
    const ownedMeetup = await prisma.meetup.findFirst({
      where: { id: meetupId, userId: userId },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!ownedMeetup) {
      return {
        ok: false,
        error: {
          auth: "認証に失敗しました",
        },
      };
    }
    return {
      ok: true,
      data: {
        meetupId: ownedMeetup.id,
        userId: ownedMeetup.userId,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: {
        server: "server error",
      },
    };
  }
};
