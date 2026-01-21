import type { Result } from "@/type/error/error";
import type { CreateMeetupInput } from "@/type/private/meetup/meetup";
import type { MeetupClientSchema } from "@/validations/private/meetupValidation";

import { prisma } from "@/lib/prisma";

export const meetupRepository = {
  async delete(meetupId: string, userId: string): Promise<Result<null>> {
    try {
      const deletedMeetups = await prisma.meetup.deleteMany({
        where: { id: meetupId, userId: userId },
      });

      if (deletedMeetups.count === 0) {
        return {
          ok: false,
          error: {
            code: "not_found",
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
          code: "db_error",
        },
      };
    }
  },

  async create(formdata: CreateMeetupInput): Promise<Result<{ id: string }>> {
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
          code: "db_error",
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
        },
      };
    }
  },
  async update(
    meetupId: string,
    formData: MeetupClientSchema,
  ): Promise<Result<void>> {
    try {
      await prisma.meetup.update({
        where: {
          id: meetupId,
        },
        data: {
          name: formData.name,
          scheduledAt: formData.scheduledAt,
        },
      });
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
        },
      };
    }
  },
};
