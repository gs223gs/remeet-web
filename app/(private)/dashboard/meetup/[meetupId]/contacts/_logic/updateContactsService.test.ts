import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Prisma } from "@prisma/client";

import { linkRepository } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/linkRepository";
import { contactRepository } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/repository/contactRepository";
import { updateContactsService } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/updateContactsService";
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
      update: vi.fn(),
    },
  }),
);

vi.mock(
  "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/linkRepository",
  () => ({
    linkRepository: {
      create: vi.fn(),
      deleteByContactId: vi.fn(),
    },
  }),
);

vi.mock("@/app/(private)/dashboard/tags/_server/tagRepository", () => ({
  tagRepository: {
    validateOwnedTagsExistence: vi.fn(),
    createContactTag: vi.fn(),
    deleteContactTagByContactId: vi.fn(),
  },
}));

describe("updateContactsService", () => {
  const mockedMeetupRepository = vi.mocked(meetupRepository);
  const mockedContactRepository = vi.mocked(contactRepository);
  const mockedLinkRepository = vi.mocked(linkRepository);
  const mockedTagRepository = vi.mocked(tagRepository);
  const mockedPrisma = vi.mocked(prisma);

  const txMock = {} as Prisma.TransactionClient;

  beforeEach(() => {
    vi.clearAllMocks();
    mockedPrisma.$transaction.mockImplementation(async (callback) =>
      callback(txMock),
    );
  });

  it("異常系: ミートアップ所有権確認が失敗ならエラーコードを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: false,
      error: { code: "authorization" },
    });

    // Act
    const result = await updateContactsService(
      "meetup-1",
      "contact-1",
      "user-1",
      {
        name: "更新後",
      },
    );

    // Assert
    expect(mockedMeetupRepository.verifyUserOwnedMeetup).toHaveBeenCalledTimes(
      1,
    );
    expect(mockedPrisma.$transaction).not.toHaveBeenCalled();
    expect(result).toEqual({
      ok: false,
      error: { code: "authorization" },
    });
  });

  it("異常系: ミートアップ所有権確認のエラーコードを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: false,
      error: { code: "db_error" },
    });

    // Act
    const result = await updateContactsService(
      "meetup-1",
      "contact-1",
      "user-1",
      {
        name: "更新後",
      },
    );

    // Assert
    expect(mockedPrisma.$transaction).not.toHaveBeenCalled();
    expect(result).toEqual({
      ok: false,
      error: { code: "db_error" },
    });
  });

  it("異常系: タグ検証に失敗したらエラーコードを返す", async () => {
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
    const result = await updateContactsService(
      "meetup-1",
      "contact-1",
      "user-1",
      {
        name: "更新後",
        tags: ["tag-1"],
      },
    );

    // Assert
    expect(
      mockedTagRepository.validateOwnedTagsExistence,
    ).toHaveBeenCalledTimes(1);
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

  it("異常系: タグ検証のエラーコードを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedTagRepository.validateOwnedTagsExistence.mockResolvedValue({
      ok: false,
      error: { code: "validation" },
    });

    // Act
    const result = await updateContactsService(
      "meetup-1",
      "contact-1",
      "user-1",
      {
        name: "更新後",
        tags: ["tag-1"],
      },
    );

    // Assert
    expect(mockedTagRepository.validateOwnedTagsExistence).toHaveBeenCalledWith(
      "user-1",
      ["tag-1"],
    );
    expect(mockedPrisma.$transaction).not.toHaveBeenCalled();
    expect(result).toEqual({
      ok: false,
      error: { code: "validation" },
    });
  });

  it("正常系: リンクとタグを更新してokを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedTagRepository.validateOwnedTagsExistence.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedContactRepository.update.mockResolvedValue({
      ok: true,
      data: "contact-1",
    });
    mockedLinkRepository.deleteByContactId.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedLinkRepository.create.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedTagRepository.deleteContactTagByContactId.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedTagRepository.createContactTag.mockResolvedValue({
      ok: true,
      data: undefined,
    });

    // Act
    const result = await updateContactsService(
      "meetup-1",
      "contact-1",
      "user-1",
      {
        name: "更新後",
        tags: ["tag-1", "tag-2"],
        githubId: "https://github.com/example",
        githubHandle: "example",
      },
    );

    // Assert
    expect(mockedPrisma.$transaction).toHaveBeenCalledTimes(1);
    expect(mockedContactRepository.update).toHaveBeenCalledWith(
      txMock,
      "contact-1",
      {
        meetupId: "meetup-1",
        userId: "user-1",
        name: "更新後",
        company: undefined,
        role: undefined,
        description: undefined,
      },
    );
    expect(mockedLinkRepository.deleteByContactId).toHaveBeenCalledWith(
      txMock,
      "contact-1",
    );
    expect(mockedTagRepository.validateOwnedTagsExistence).toHaveBeenCalledWith(
      "user-1",
      ["tag-1", "tag-2"],
    );
    expect(mockedLinkRepository.create).toHaveBeenCalledWith(
      txMock,
      "contact-1",
      expect.any(Array),
    );
    expect(
      mockedTagRepository.deleteContactTagByContactId,
    ).toHaveBeenCalledWith(txMock, "contact-1");
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

  it("正常系: 会社/役職/説明を含めて更新できる", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedContactRepository.update.mockResolvedValue({
      ok: true,
      data: "contact-1",
    });
    mockedLinkRepository.deleteByContactId.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedTagRepository.deleteContactTagByContactId.mockResolvedValue({
      ok: true,
      data: undefined,
    });

    // Act
    const result = await updateContactsService(
      "meetup-1",
      "contact-1",
      "user-1",
      {
        name: "更新後",
        company: "合同会社サンプル",
        role: "Engineer",
        description: "note",
      },
    );

    // Assert
    expect(mockedContactRepository.update).toHaveBeenCalledWith(
      txMock,
      "contact-1",
      {
        meetupId: "meetup-1",
        userId: "user-1",
        name: "更新後",
        company: "合同会社サンプル",
        role: "Engineer",
        description: "note",
      },
    );
    expect(result).toEqual({
      ok: true,
      data: undefined,
    });
  });

  it("エッジケース: タグなしでもリンクありならokを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedContactRepository.update.mockResolvedValue({
      ok: true,
      data: "contact-1",
    });
    mockedLinkRepository.deleteByContactId.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedTagRepository.deleteContactTagByContactId.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedLinkRepository.create.mockResolvedValue({
      ok: true,
      data: undefined,
    });

    // Act
    const result = await updateContactsService(
      "meetup-1",
      "contact-1",
      "user-1",
      {
        name: "更新後",
        githubId: "https://github.com/example",
      },
    );

    // Assert
    expect(
      mockedTagRepository.validateOwnedTagsExistence,
    ).not.toHaveBeenCalled();
    expect(mockedLinkRepository.create).toHaveBeenCalledTimes(1);
    expect(mockedTagRepository.createContactTag).not.toHaveBeenCalled();
    expect(result).toEqual({
      ok: true,
      data: undefined,
    });
  });

  it("エッジケース: リンクなしでもタグありならokを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedTagRepository.validateOwnedTagsExistence.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedContactRepository.update.mockResolvedValue({
      ok: true,
      data: "contact-1",
    });
    mockedLinkRepository.deleteByContactId.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedTagRepository.deleteContactTagByContactId.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedTagRepository.createContactTag.mockResolvedValue({
      ok: true,
      data: undefined,
    });

    // Act
    const result = await updateContactsService(
      "meetup-1",
      "contact-1",
      "user-1",
      {
        name: "更新後",
        tags: ["tag-1"],
      },
    );

    // Assert
    expect(
      mockedTagRepository.validateOwnedTagsExistence,
    ).toHaveBeenCalledTimes(1);
    expect(mockedTagRepository.validateOwnedTagsExistence).toHaveBeenCalledWith(
      "user-1",
      ["tag-1"],
    );
    expect(mockedLinkRepository.create).not.toHaveBeenCalled();
    expect(mockedTagRepository.createContactTag).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      ok: true,
      data: undefined,
    });
  });

  it("エッジケース: タグもリンクもなしでもokを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedContactRepository.update.mockResolvedValue({
      ok: true,
      data: "contact-1",
    });
    mockedLinkRepository.deleteByContactId.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedTagRepository.deleteContactTagByContactId.mockResolvedValue({
      ok: true,
      data: undefined,
    });

    // Act
    const result = await updateContactsService(
      "meetup-1",
      "contact-1",
      "user-1",
      {
        name: "更新後",
      },
    );

    // Assert
    expect(
      mockedTagRepository.validateOwnedTagsExistence,
    ).not.toHaveBeenCalled();
    expect(mockedLinkRepository.create).not.toHaveBeenCalled();
    expect(mockedTagRepository.createContactTag).not.toHaveBeenCalled();
    expect(result).toEqual({
      ok: true,
      data: undefined,
    });
  });

  it("異常系: 連絡先更新が失敗したらdb_errorを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedContactRepository.update.mockResolvedValue({
      ok: false,
      error: { code: "db_error" },
    });

    // Act
    const result = await updateContactsService(
      "meetup-1",
      "contact-1",
      "user-1",
      {
        name: "更新後",
      },
    );

    // Assert
    expect(mockedLinkRepository.deleteByContactId).not.toHaveBeenCalled();
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
    const result = await updateContactsService(
      "meetup-1",
      "contact-1",
      "user-1",
      {
        name: "更新後",
      },
    );

    // Assert
    expect(result).toEqual({
      ok: false,
      error: { code: "db_error" },
    });
  });

  it("異常系: リンク削除が失敗したらdb_errorを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedContactRepository.update.mockResolvedValue({
      ok: true,
      data: "contact-1",
    });
    mockedLinkRepository.deleteByContactId.mockResolvedValue({
      ok: false,
      error: { code: "db_error" },
    });

    // Act
    const result = await updateContactsService(
      "meetup-1",
      "contact-1",
      "user-1",
      {
        name: "更新後",
      },
    );

    // Assert
    expect(mockedLinkRepository.create).not.toHaveBeenCalled();
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
    mockedContactRepository.update.mockResolvedValue({
      ok: true,
      data: "contact-1",
    });
    mockedLinkRepository.deleteByContactId.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedLinkRepository.create.mockResolvedValue({
      ok: false,
      error: { code: "db_error" },
    });
    mockedTagRepository.deleteContactTagByContactId.mockResolvedValue({
      ok: true,
      data: undefined,
    });

    // Act
    const result = await updateContactsService(
      "meetup-1",
      "contact-1",
      "user-1",
      {
        name: "更新後",
        githubId: "https://github.com/example",
      },
    );

    // Assert
    expect(result).toEqual({
      ok: false,
      error: { code: "db_error" },
    });
  });

  it("異常系: 連絡先タグ削除が失敗したらdb_errorを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedContactRepository.update.mockResolvedValue({
      ok: true,
      data: "contact-1",
    });
    mockedLinkRepository.deleteByContactId.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedTagRepository.deleteContactTagByContactId.mockResolvedValue({
      ok: false,
      error: { code: "db_error" },
    });

    // Act
    const result = await updateContactsService(
      "meetup-1",
      "contact-1",
      "user-1",
      {
        name: "更新後",
      },
    );

    // Assert
    expect(result).toEqual({
      ok: false,
      error: { code: "db_error" },
    });
  });

  it("異常系: 連絡先タグ作成が失敗したらdb_errorを返す", async () => {
    // Arrange
    mockedMeetupRepository.verifyUserOwnedMeetup.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedTagRepository.validateOwnedTagsExistence.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedContactRepository.update.mockResolvedValue({
      ok: true,
      data: "contact-1",
    });
    mockedLinkRepository.deleteByContactId.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedTagRepository.deleteContactTagByContactId.mockResolvedValue({
      ok: true,
      data: undefined,
    });
    mockedTagRepository.createContactTag.mockResolvedValue({
      ok: false,
      error: { code: "db_error" },
    });

    // Act
    const result = await updateContactsService(
      "meetup-1",
      "contact-1",
      "user-1",
      {
        name: "更新後",
        tags: ["tag-1"],
      },
    );

    // Assert
    expect(result).toEqual({
      ok: false,
      error: { code: "db_error" },
    });
  });
});
