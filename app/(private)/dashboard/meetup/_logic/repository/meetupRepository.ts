import type { MigrationResult, Result } from "@/type/error/error";
import type {
  CreateMeetupInput,
  MeetupErrors,
} from "@/type/private/meetup/meetup";

import { prisma } from "@/lib/prisma";

export const meetupRepository = {
  async delete(
    meetupId: string,
    userId: string,
  ): Promise<MigrationResult<null, MeetupErrors>> {
    try {
      const deletedMeetups = await prisma.meetup.deleteMany({
        where: { id: meetupId, userId: userId },
      });

      if (deletedMeetups.count === 0) {
        return {
          ok: false,
          error: {
            server: "server error",
          },
        };
      }
      return {
        ok: true,
        data: null,
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
  },

  async create(
    formdata: CreateMeetupInput,
  ): Promise<MigrationResult<{ id: string }, MeetupErrors>> {
    try {
      const createdMeetup = await prisma.meetup.create({
        data: {
          userId: formdata.userId,
          name: formdata.name,
          scheduledAt: formdata.scheduledAt,
        },
      });

      return {
        ok: true,
        data: {
          id: createdMeetup.id,
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
  },
  async verifyUserOwnedMeetup(
    userId: string,
    meetupId: string,
  ): Promise<Result<void>> {
    try {
      const verifiedUserOwned = await prisma.meetup.findFirst({
        where: { userId: userId, id: meetupId },
        select: { id: true },
      });

      if (!verifiedUserOwned) {
        return {
          ok: false,
          error: {
            code: "authorization",
            message: ["meetupの権限不足"],
          },
        };
      }

      return {
        ok: true,
        data: undefined,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: {
          code: "db_error",
          message: ["prismaでerror発生"],
        },
      };
    }
  },
};
