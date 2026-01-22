import { beforeEach, describe, expect, it, vi } from "vitest";

import type { ContactsFormData } from "@/type/private/contacts/contacts";
import type { Prisma } from "@prisma/client";

import { convertInsertableLinks } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/convertInsertableLinks";
import { createContactService } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/createContactsService";
import { linkRepository } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/linkRepository";
import { contactRepository } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/repository/contactRepository";
import { meetupRepository } from "@/app/(private)/dashboard/meetup/_logic/repository/meetupRepository";
import { tagRepository } from "@/app/(private)/dashboard/tags/_server/tagRepository";
import { prisma } from "@/lib/prisma";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    $transaction: vi.fn(),
  },
}));

vi.mock(
  "@/app/(private)/dashboard/meetup/_logic/repository/meetupRepository",
  () => ({
    meetupRepository: {
      verifyUserOwnedMeetup: vi.fn(),
    },
  }),
);

vi.mock(
  "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/repository/contactRepository",
  () => ({
    contactRepository: {
      create: vi.fn(),
    },
  }),
);

vi.mock(
  "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/linkRepository",
  () => ({
    linkRepository: {
      create: vi.fn(),
    },
  }),
);

vi.mock("@/app/(private)/dashboard/tags/_server/tagRepository", () => ({
  tagRepository: {
    validateOwnedTagsExistence: vi.fn(),
    createContactTag: vi.fn(),
  },
}));

vi.mock(
  "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/convertInsertableLinks",
  () => ({
    convertInsertableLinks: vi.fn(),
  }),
);

describe("createContactService", () => {
  const mockedMeetupRepository = vi.mocked(meetupRepository);
  const mockedContactRepository = vi.mocked(contactRepository);
  const mockedLinkRepository = vi.mocked(linkRepository);
  const mockedTagRepository = vi.mocked(tagRepository);
  const mockedPrisma = vi.mocked(prisma);
  const mockedConvertInsertableLinks = vi.mocked(convertInsertableLinks);

  const txMock = {} as Prisma.TransactionClient;
  const baseFields: ContactsFormData = {
    name: "山田太郎",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockedPrisma.$transaction.mockImplementation(async (callback) =>
      callback(txMock),
    );
  });

  it("異常系: ミートアップ所有権確認がauthorizationならauthorizationを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: false,
      error: { code: "authorization" },
    });

    // Act
    const result = await createContactService("meetup-1", "user-1", baseFields);

    // Assert
    expect(mockedPrisma.$transaction).not.toHaveBeenCalled();
    expect(result).toEqual({
      ok: false,
      error: { code: "authorization" },
    });
  });

  it("異常系: ミートアップ所有権確認がdb_errorならdb_errorを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: false,
      error: { code: "db_error" },
    });

    // Act
    const result = await createContactService("meetup-1", "user-1", baseFields);

    // Assert
    expect(mockedPrisma.$transaction).not.toHaveBeenCalled();
    expect(result).toEqual({
      ok: false,
      error: { code: "db_error" },
    });
  });

  it("異常系: タグ検証が失敗したらauthorizationを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedTagRepository.validateOwnedTagsExistence.mockResolvedValue({
      ok: false,
      error: { code: "authorization" },
    });

    // Act
    const result = await createContactService("meetup-1", "user-1", {
      ...baseFields,
      tags: ["tag-1"],
    });

    // Assert
    expect(mockedTagRepository.validateOwnedTagsExistence).toHaveBeenCalledWith(
      "user-1",
      ["tag-1"],
    );
    expect(mockedPrisma.$transaction).not.toHaveBeenCalled();
    expect(result).toEqual({
      ok: false,
      error: { code: "authorization" },
    });
  });

  it("正常系: 連絡先のみ作成してokを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedConvertInsertableLinks.mockReturnValue([]);
    mockedContactRepository.create.mockResolvedValue({
      ok: true,
      data: "contact-1",
    });

    // Act
    const result = await createContactService("meetup-1", "user-1", {
      ...baseFields,
      company: "Sample Inc.",
    });

    // Assert
    expect(mockedPrisma.$transaction).toHaveBeenCalledTimes(1);
    expect(mockedContactRepository.create).toHaveBeenCalledWith(txMock, {
      meetupId: "meetup-1",
      userId: "user-1",
      name: "山田太郎",
      company: "Sample Inc.",
      role: undefined,
      description: undefined,
    });
    expect(mockedLinkRepository.create).not.toHaveBeenCalled();
    expect(mockedTagRepository.createContactTag).not.toHaveBeenCalled();
    expect(result).toEqual({
      ok: true,
      data: undefined,
    });
  });

  it("正常系: リンクとタグを作成してokを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedTagRepository.validateOwnedTagsExistence.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedConvertInsertableLinks.mockReturnValue([
      {
        type: "GITHUB",
        url: "https://github.com/example",
      },
    ]);
    mockedContactRepository.create.mockResolvedValue({
      ok: true,
      data: "contact-1",
    });
    mockedLinkRepository.create.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedTagRepository.createContactTag.mockResolvedValue({
      ok: true,
      data: undefined,
    });

    // Act
    const result = await createContactService("meetup-1", "user-1", {
      ...baseFields,
      tags: ["tag-1", "tag-2"],
      githubId: "https://github.com/example",
    });

    // Assert
    expect(mockedLinkRepository.create).toHaveBeenCalledWith(
      txMock,
      "contact-1",
      expect.any(Array),
    );
    expect(mockedTagRepository.createContactTag).toHaveBeenCalledWith(
      txMock,
      "contact-1",
      ["tag-1", "tag-2"],
    );
    expect(result).toEqual({
      ok: true,
      data: undefined,
    });
  });

  it("エッジケース: タグ未指定ならタグ検証を呼ばない", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedConvertInsertableLinks.mockReturnValue([]);
    mockedContactRepository.create.mockResolvedValue({
      ok: true,
      data: "contact-1",
    });

    // Act
    const result = await createContactService("meetup-1", "user-1", baseFields);

    // Assert
    expect(
      mockedTagRepository.validateOwnedTagsExistence,
    ).not.toHaveBeenCalled();
    expect(result).toEqual({
      ok: true,
      data: undefined,
    });
  });

  it("異常系: 連絡先作成が失敗したらdb_errorを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedConvertInsertableLinks.mockReturnValue([]);
    mockedContactRepository.create.mockResolvedValue({
      ok: false,
      error: { code: "db_error" },
    });

    // Act
    const result = await createContactService("meetup-1", "user-1", baseFields);

    // Assert
    expect(result).toEqual({
      ok: false,
      error: { code: "db_error" },
    });
  });

  it("異常系: リンク作成が失敗したらdb_errorを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedConvertInsertableLinks.mockReturnValue([
      {
        type: "GITHUB",
        url: "https://github.com/example",
      },
    ]);
    mockedContactRepository.create.mockResolvedValue({
      ok: true,
      data: "contact-1",
    });
    mockedLinkRepository.create.mockResolvedValue({
      ok: false,
      error: { code: "db_error" },
    });

    // Act
    const result = await createContactService("meetup-1", "user-1", {
      ...baseFields,
      githubId: "https://github.com/example",
    });

    // Assert
    expect(result).toEqual({
      ok: false,
      error: { code: "db_error" },
    });
  });

  it("異常系: タグ作成が失敗したらdb_errorを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedTagRepository.validateOwnedTagsExistence.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedConvertInsertableLinks.mockReturnValue([]);
    mockedContactRepository.create.mockResolvedValue({
      ok: true,
      data: "contact-1",
    });
    mockedTagRepository.createContactTag.mockResolvedValue({
      ok: false,
      error: { code: "db_error" },
    });

    // Act
    const result = await createContactService("meetup-1", "user-1", {
      ...baseFields,
      tags: ["tag-1"],
    });

    // Assert
    expect(result).toEqual({
      ok: false,
      error: { code: "db_error" },
    });
  });

  it("異常系: transactionが例外を投げたらdb_errorを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedPrisma.$transaction.mockRejectedValue(new Error("tx error"));

    // Act
    const result = await createContactService("meetup-1", "user-1", baseFields);

    // Assert
    expect(result).toEqual({
      ok: false,
      error: { code: "db_error" },
    });
  });
});
