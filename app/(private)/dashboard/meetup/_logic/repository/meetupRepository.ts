import type { MigrationResult } from "@/type/error/error";
import type { MeetupErrors } from "@/type/private/meetup/meetup";

import { prisma } from "@/lib/prisma";

export const meetupRepository = {
  async delete(
    meetupId: string,
    userId: string,
  ): Promise<MigrationResult<null, MeetupErrors>> {
    try {
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
};
