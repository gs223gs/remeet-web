import { beforeEach, describe, expect, it, vi } from "vitest";

const prismaMock = vi.hoisted(() => ({
  tag: {
    findMany: vi.fn(),
  },
}));

vi.mock("@/lib/prisma", () => ({ prisma: prismaMock }));

const getUserMock = vi.hoisted(() => vi.fn());
vi.mock("@/auth", () => ({ getUser: getUserMock }));

import { getTags } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_server/server";

describe("getTags のテスト", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getUserMock.mockReset();
    prismaMock.tag.findMany.mockReset();
  });

  it("ユーザーが取得できない場合は未認証エラーを返す", async () => {
    getUserMock.mockResolvedValueOnce(null);

    const result = await getTags();

    expect(prismaMock.tag.findMany).not.toHaveBeenCalled();
    expect(result).toEqual({
      ok: false,
      error: {
        code: "unauthenticated",
        message: ["情報取得に失敗しました"],
      },
    });
  });

  it("認証済みユーザーのタグを取得して返す", async () => {
    const user = { id: "user-123" };
    const tags = [
      { id: "tag-1", name: "friend" },
      { id: "tag-2", name: "coworker" },
    ];

    getUserMock.mockResolvedValueOnce(user);
    prismaMock.tag.findMany.mockResolvedValueOnce(tags);

    const result = await getTags();

    expect(prismaMock.tag.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.tag.findMany).toHaveBeenCalledWith({
      where: { userId: user.id },
      select: {
        id: true,
        name: true,
      },
    });
    expect(result).toEqual({
      ok: true,
      data: tags,
    });
  });

  it("Prisma が例外を投げた場合は db_error を返す", async () => {
    getUserMock.mockResolvedValueOnce({ id: "user-456" });
    prismaMock.tag.findMany.mockRejectedValueOnce(new Error("db exploded"));

    const result = await getTags();

    expect(result).toEqual({
      ok: false,
      error: {
        code: "db_error",
        message: [],
      },
    });
  });
});
