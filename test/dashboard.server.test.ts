import { describe, it, expect, beforeEach, vi } from "vitest";

// テストで使用するモックを先に持ち上げて定義（TDZ回避）
const prismaMock = vi.hoisted(() => ({
  contact: { count: vi.fn() },
  meetup: { findFirst: vi.fn(), count: vi.fn() },
}));

vi.mock("@/lib/prisma", () => ({ prisma: prismaMock }));

const getUserMock = vi.hoisted(() => vi.fn());
vi.mock("@/auth", () => ({ getUser: getUserMock }));

// モック設定後に対象をインポート
import {
  getUserDashboardSummary,
  getLastMeetupContacts,
  getMeetupCount,
} from "../app/(private)/dashboard/_server/server";

describe("ダッシュボードのサーバー関数", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("未認証なら unauthenticated を返す", async () => {
    getUserMock.mockResolvedValueOnce(null);

    const res = await getUserDashboardSummary();
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error.code).toBe("unauthenticated");
    }
  });

  it("正常系: サマリーを返す", async () => {
    getUserMock.mockResolvedValueOnce({ id: "user-1" });
    prismaMock.contact.count.mockResolvedValueOnce(5);
    prismaMock.meetup.count.mockResolvedValueOnce(2);
    prismaMock.meetup.findFirst.mockResolvedValueOnce({
      id: "m1",
      userId: "user-1",
      name: "Monthly Dev Meetup",
      scheduledAt: new Date("2025-01-10T12:00:00Z"),
      contacts: [
        { meetupId: "m1", contactId: "c1", contact: { name: "Alice" } },
        { meetupId: "m1", contactId: "c2", contact: { name: "Bob" } },
      ],
    });

    const res = await getUserDashboardSummary();
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.data.thisYearContactCount).toBe(5);
      expect(res.data.meetupCount).toBe(2);
      expect(res.data.lastMeetupContacts).toEqual([
        {
          meetupId: "m1",
          meetupName: "Monthly Dev Meetup",
          meetupScheduledAt: new Date("2025-01-10T12:00:00Z"),
          contactId: "c1",
          contactName: "Alice",
        },
        {
          meetupId: "m1",
          meetupName: "Monthly Dev Meetup",
          meetupScheduledAt: new Date("2025-01-10T12:00:00Z"),
          contactId: "c2",
          contactName: "Bob",
        },
      ]);
    }
  });

  it("最新のMeetupが無い場合は空配列を返す", async () => {
    prismaMock.meetup.findFirst.mockResolvedValueOnce(null);
    const rows = await getLastMeetupContacts("user-1");
    expect(rows).toEqual([]);
  });

  it("lastMeetupContacts 内部エラー時は空配列を返す", async () => {
    prismaMock.meetup.findFirst.mockRejectedValueOnce(new Error("db"));
    const rows = await getLastMeetupContacts("user-1");
    expect(rows).toEqual([]);
  });

  it("getMeetupCount 内部エラー時は 0 を返す", async () => {
    prismaMock.meetup.count.mockRejectedValueOnce(new Error("db"));
    const c = await getMeetupCount("user-1");
    expect(c).toBe(0);
  });

  it("getThisYearContacts が例外を投げた場合は db_error を返す", async () => {
    getUserMock.mockResolvedValueOnce({ id: "user-1" });
    prismaMock.contact.count.mockRejectedValueOnce(new Error("db"));
    prismaMock.meetup.findFirst.mockResolvedValueOnce(null);
    prismaMock.meetup.count.mockResolvedValueOnce(0);

    const res = await getUserDashboardSummary();
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error.code).toBe("db_error");
    }
  });
});
