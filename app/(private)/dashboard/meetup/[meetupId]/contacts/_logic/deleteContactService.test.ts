import { beforeEach, describe, expect, it, vi } from "vitest";

import { deleteContactService } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/deleteContactService";
import { contactRepository } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/repository/contactRepository";
import { getOwnedContact } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/service/checkContactOwner";

vi.mock(
  "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/repository/contactRepository",
  () => ({
    contactRepository: {
      delete: vi.fn(),
    },
  }),
);

vi.mock(
  "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/service/checkContactOwner",
  () => ({
    getOwnedContact: vi.fn(),
  }),
);

describe("deleteContactService", () => {
  const mockedContactRepository = vi.mocked(contactRepository);
  const mockedGetOwnedContact = vi.mocked(getOwnedContact);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("異常系: 所有権確認に失敗したらauthorizationを返す", async () => {
    // Arrange
    mockedGetOwnedContact.mockResolvedValue({
      ok: false,
      error: { auth: "認証に失敗しました" },
    });

    // Act
    const result = await deleteContactService("contact-1", "user-1");

    // Assert
    expect(mockedGetOwnedContact).toHaveBeenCalledTimes(1);
    expect(mockedGetOwnedContact).toHaveBeenCalledWith("contact-1", "user-1");
    expect(mockedContactRepository.delete).not.toHaveBeenCalled();
    expect(result).toEqual({
      ok: false,
      error: { code: "authorization" },
    });
  });

  it("異常系: 削除に失敗したらrepositoryのエラーコードを返す", async () => {
    // Arrange
    mockedGetOwnedContact.mockResolvedValue({
      ok: true,
      data: { contactId: "contact-1", userId: "user-1" },
    });
    mockedContactRepository.delete.mockResolvedValue({
      ok: false,
      error: { code: "not_found" },
    });

    // Act
    const result = await deleteContactService("contact-1", "user-1");

    // Assert
    expect(mockedContactRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockedContactRepository.delete).toHaveBeenCalledWith(
      "contact-1",
      "user-1",
    );
    expect(result).toEqual({
      ok: false,
      error: { code: "not_found" },
    });
  });

  it("正常系: 削除成功でokを返す", async () => {
    // Arrange
    mockedGetOwnedContact.mockResolvedValue({
      ok: true,
      data: { contactId: "contact-1", userId: "user-1" },
    });
    mockedContactRepository.delete.mockResolvedValue({
      ok: true,
      data: undefined,
    });

    // Act
    const result = await deleteContactService("contact-1", "user-1");

    // Assert
    expect(result).toEqual({
      ok: true,
      data: undefined,
    });
  });
});
