import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

import type { CreateMeetupInput } from "@/type/private/meetup/meetup";

import { meetupRepository } from "@/app/(private)/dashboard/meetup/_logic/repository/meetupRepository";
import { prisma } from "@/lib/prisma";

describe.sequential("meetupRepository.create（Integration）", () => {
  beforeAll(async () => {
    await prisma.$queryRaw`SELECT 1`;
  });

  beforeEach(async () => {
    await prisma.meetup.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("正常系: DBにMeetupを作成してidを返す", async () => {
    // Arrange
    await prisma.user.create({
      data: {
        id: "user-1",
        email: "user-1@example.com",
      },
    });
    const input: CreateMeetupInput = {
      userId: "user-1",
      name: "test meetup",
      scheduledAt: new Date("2024-01-02T03:04:05.000Z"),
    };

    // Act
    const result = await meetupRepository.create(input);

    // Assert
    expect(result.ok).toBe(true);
    if (result.ok) {
      const created = await prisma.meetup.findUnique({
        where: { id: result.data.id },
      });
      expect(created?.userId).toBe(input.userId);
      expect(created?.name).toBe(input.name);
      expect(created?.scheduledAt.toISOString()).toBe(
        input.scheduledAt.toISOString(),
      );
    }
  });

  it("異常系: 存在しないuserIdはdb_errorを返す", async () => {
    // Arrange
    const input: CreateMeetupInput = {
      userId: "missing-user",
      name: "invalid meetup",
      scheduledAt: new Date("2024-02-03T04:05:06.000Z"),
    };

    // Act
    const result = await meetupRepository.create(input);

    // Assert
    expect(result).toEqual({
      ok: false,
      error: { code: "db_error" },
    });
    const count = await prisma.meetup.count();
    expect(count).toBe(0);
  });
});
