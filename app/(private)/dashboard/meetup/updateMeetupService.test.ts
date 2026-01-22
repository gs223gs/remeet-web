import { describe, it, expect, vi, beforeEach } from "vitest";

import { meetupRepository } from "@/app/(private)/dashboard/meetup/_logic/repository/meetupRepository";
import { updateMeetupService } from "@/app/(private)/dashboard/meetup/updateMeetupService";

vi.mock(
  "@/app/(private)/dashboard/meetup/_logic/repository/meetupRepository",
  () => ({
    meetupRepository: {
      update: vi.fn(),
      verifyUserOwnedMeetup: vi.fn(),
    },
  }),
);

describe("updateMeetupService", () => {
  const mockedMeetupRepository = vi.mocked(meetupRepository);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("異常系: 所有権確認が失敗ならauthorizationを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: false,
      error: { code: "authorization" },
    });

    // Act
    const result = await updateMeetupService("meetup-1", "user-1", {
      name: "更新後",
      scheduledAt: new Date("2025-01-01T00:00:00.000Z"),
    });

    // Assert
    expect(mockedMeetupRepository.verifyUserOwnedMeetup).toHaveBeenCalledTimes(
      1,
    );
    expect(mockedMeetupRepository.verifyUserOwnedMeetup).toHaveBeenCalledWith(
      "user-1",
      "meetup-1",
    );
    expect(mockedMeetupRepository.update).not.toHaveBeenCalled();
    expect(result).toEqual({
      ok: false,
      error: { code: "authorization" },
    });
  });

  it("異常系: 所有権確認のエラーコードを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: false,
      error: { code: "db_error" },
    });

    // Act
    const result = await updateMeetupService("meetup-1", "user-1", {
      name: "更新後",
      scheduledAt: new Date("2025-01-01T00:00:00.000Z"),
    });

    // Assert
    expect(mockedMeetupRepository.verifyUserOwnedMeetup).toHaveBeenCalledTimes(
      1,
    );
    expect(mockedMeetupRepository.update).not.toHaveBeenCalled();
    expect(result).toEqual({
      ok: false,
      error: { code: "db_error" },
    });
  });

  it("異常系: 更新に失敗したらrepositoryのエラーコードを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedMeetupRepository.update.mockResolvedValue({
      ok: false,
      error: { code: "db_error" },
    });

    // Act
    const result = await updateMeetupService("meetup-1", "user-1", {
      name: "更新後",
      scheduledAt: new Date("2025-01-01T00:00:00.000Z"),
    });

    // Assert
    expect(mockedMeetupRepository.update).toHaveBeenCalledTimes(1);
    expect(mockedMeetupRepository.update).toHaveBeenCalledWith("meetup-1", {
      name: "更新後",
      scheduledAt: new Date("2025-01-01T00:00:00.000Z"),
    });
    expect(result).toEqual({
      ok: false,
      error: { code: "db_error" },
    });
  });

  it("正常系: 更新成功でokを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedMeetupRepository.update.mockResolvedValue({
      ok: true,
      data: undefined,
    });

    // Act
    const result = await updateMeetupService("meetup-1", "user-1", {
      name: "更新後",
      scheduledAt: new Date("2025-01-01T00:00:00.000Z"),
    });

    // Assert
    expect(result).toEqual({
      ok: true,
      data: undefined,
    });
  });
});
