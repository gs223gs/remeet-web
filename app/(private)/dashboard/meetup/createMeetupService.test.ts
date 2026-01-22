import { describe, it, expect, vi, beforeEach } from "vitest";

import { meetupRepository } from "@/app/(private)/dashboard/meetup/_logic/repository/meetupRepository";
import { createMeetupService } from "@/app/(private)/dashboard/meetup/createMeetupService";

vi.mock(
  "@/app/(private)/dashboard/meetup/_logic/repository/meetupRepository",
  () => ({
    meetupRepository: {
      create: vi.fn(),
    },
  }),
);

describe("createMeetupService", () => {
  const mockedMeetupRepository = vi.mocked(meetupRepository);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("正常系: 作成されたIDを返す", async () => {
    // Arrange
    const userId = "user-1";
    const scheduledAt = new Date("2025-01-01T00:00:00.000Z");
    mockedMeetupRepository.create.mockResolvedValue({
      ok: true,
      data: { id: "meetup-1" },
    });

    // Act
    const result = await createMeetupService(userId, {
      meetupName: "歓迎会",
      scheduledAt,
    });

    // Assert
    expect(mockedMeetupRepository.create).toHaveBeenCalledTimes(1);
    expect(mockedMeetupRepository.create).toHaveBeenCalledWith({
      userId,
      name: "歓迎会",
      scheduledAt,
    });
    expect(result).toEqual({
      ok: true,
      data: { meetupId: "meetup-1" },
    });
  });

  it("異常系: repositoryのエラーコードを返す", async () => {
    // Arrange
    mockedMeetupRepository.create.mockResolvedValue({
      ok: false,
      error: { code: "db_error" },
    });

    // Act
    const result = await createMeetupService("user-1", {
      meetupName: "歓迎会",
      scheduledAt: new Date("2025-01-01T00:00:00.000Z"),
    });

    // Assert
    expect(result).toEqual({
      ok: false,
      error: { code: "db_error" },
    });
  });
});
