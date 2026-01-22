import { describe, it, expect, vi, beforeEach } from "vitest";

import { meetupRepository } from "@/app/(private)/dashboard/meetup/_logic/repository/meetupRepository";
import { deleteMeetupService } from "@/app/(private)/dashboard/meetup/deleteMeetupService";

vi.mock(
  "@/app/(private)/dashboard/meetup/_logic/repository/meetupRepository",
  () => ({
    meetupRepository: {
      delete: vi.fn(),
      verifyUserOwnedMeetup: vi.fn(),
    },
  }),
);

describe("deleteMeetupService", () => {
  const mockedMeetupRepository = vi.mocked(meetupRepository);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("異常系: 所有権確認に失敗したらauthorizationを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: false,
      error: { code: "authorization" },
    });

    // Act
    const result = await deleteMeetupService("user-1", "meetup-1");

    // Assert
    expect(mockedMeetupRepository.verifyUserOwnedMeetup).toHaveBeenCalledTimes(
      1,
    );
    expect(mockedMeetupRepository.verifyUserOwnedMeetup).toHaveBeenCalledWith(
      "user-1",
      "meetup-1",
    );
    expect(mockedMeetupRepository.delete).not.toHaveBeenCalled();
    expect(result).toEqual({
      ok: false,
      error: { code: "authorization" },
    });
  });

  it("異常系: 削除に失敗したらdb_errorを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedMeetupRepository.delete.mockResolvedValue({
      ok: false,
      error: { code: "db_error" },
    });

    // Act
    const result = await deleteMeetupService("user-1", "meetup-1");

    // Assert
    expect(mockedMeetupRepository.verifyUserOwnedMeetup).toHaveBeenCalledTimes(
      1,
    );
    expect(mockedMeetupRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockedMeetupRepository.delete).toHaveBeenCalledWith(
      "meetup-1",
      "user-1",
    );
    expect(result).toEqual({
      ok: false,
      error: { code: "db_error" },
    });
  });

  it("正常系: 削除成功でokを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedMeetupRepository.delete.mockResolvedValue({
      ok: true,
      data: null,
    });

    // Act
    const result = await deleteMeetupService("user-1", "meetup-1");

    // Assert
    expect(result).toEqual({
      ok: true,
      data: undefined,
    });
  });
});
