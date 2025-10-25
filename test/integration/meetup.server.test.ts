import { describe, it, expect, beforeEach, vi } from "vitest";

// Hoist prisma mock before module import
const prismaMock = vi.hoisted(() => ({
  meetup: { findFirst: vi.fn() },
}));

vi.mock("@/lib/prisma", () => ({ prisma: prismaMock }));
// Mock auth to prevent next-auth/next imports during module load
const getUserMock = vi.hoisted(() => vi.fn());
vi.mock("@/auth", () => ({ getUser: getUserMock }));

// Import target after mocks are set up
import { getMeetupDetailWithContacts } from "@/app/(private)/dashboard/meetup/_server/server";

describe("getMeetupDetailWithContacts のテスト", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("該当データが無い場合は null を返す", async () => {
    prismaMock.meetup.findFirst.mockResolvedValueOnce(null);

    const res = await getMeetupDetailWithContacts("m1", "user-1");
    expect(res).toBeNull();
  });

  it("Prismaの結果をサマリー形式（contacts/tags含む）に整形して返す", async () => {
    const scheduledAt = new Date("2025-01-10T12:00:00Z");
    prismaMock.meetup.findFirst.mockResolvedValueOnce({
      id: "m1",
      name: "Monthly Dev Meetup",
      scheduledAt,
      _count: { contacts: 2 },
      contacts: [
        {
          contact: {
            id: "c1",
            name: "Alice",
            company: "Acme",
            role: "Dev",
            tags: [
              { tag: { name: "TypeScript" } },
              { tag: { name: "Prisma" } },
            ],
          },
        },
        {
          contact: {
            id: "c2",
            name: "Bob",
            company: null,
            role: null,
            tags: [],
          },
        },
      ],
    });

    const res = await getMeetupDetailWithContacts("m1", "user-1");
    expect(res).not.toBeNull();
    if (!res) return;

    expect(res.contactCount).toBe(2);
    expect(res.detailWithContacts.detail).toEqual({
      id: "m1",
      name: "Monthly Dev Meetup",
      scheduledAt,
    });
    expect(res.detailWithContacts.contacts).toEqual([
      {
        id: "c1",
        name: "Alice",
        company: "Acme",
        role: "Dev",
        tags: ["TypeScript", "Prisma"],
      },
      {
        id: "c2",
        name: "Bob",
        // company/role は null の場合は undefined に正規化される
        company: undefined,
        role: undefined,
        tags: [],
      },
    ]);
  });

  it("contacts が 0 件のときは count=0 かつ空配列を返す", async () => {
    const scheduledAt = new Date("2025-02-01T09:00:00Z");
    prismaMock.meetup.findFirst.mockResolvedValueOnce({
      id: "m2",
      name: "No Contacts Meetup",
      scheduledAt,
      _count: { contacts: 0 },
      contacts: [],
    });

    const res = await getMeetupDetailWithContacts("m2", "user-1");
    expect(res).not.toBeNull();
    if (!res) return;
    expect(res.contactCount).toBe(0);
    expect(res.detailWithContacts.detail).toEqual({
      id: "m2",
      name: "No Contacts Meetup",
      scheduledAt,
    });
    expect(res.detailWithContacts.contacts).toEqual([]);
  });

  it("Prisma 呼び出しが想定どおりの where/select で行われる", async () => {
    const scheduledAt = new Date("2025-03-01T10:00:00Z");
    prismaMock.meetup.findFirst.mockResolvedValueOnce({
      id: "m3",
      name: "Shape Check",
      scheduledAt,
      _count: { contacts: 1 },
      contacts: [
        {
          contact: {
            id: "c10",
            name: "Cara",
            company: null,
            role: null,
            tags: [{ tag: { name: "JS" } }],
          },
        },
      ],
    });

    const meetupId = "m3";
    const userId = "user-9";
    await getMeetupDetailWithContacts(meetupId, userId);

    expect(prismaMock.meetup.findFirst).toHaveBeenCalledTimes(1);
    const arg = prismaMock.meetup.findFirst.mock.calls[0][0];
    expect(arg.where).toEqual({ id: meetupId, userId });
    // 必要な select キーが含まれていることをスポットチェック
    expect(arg.select).toHaveProperty("id", true);
    expect(arg.select).toHaveProperty("name", true);
    expect(arg.select).toHaveProperty("scheduledAt", true);
    expect(arg.select).toHaveProperty("_count");
    expect(arg.select).toHaveProperty("contacts");
  });

  it("内部エラー時は null を返す", async () => {
    prismaMock.meetup.findFirst.mockRejectedValueOnce(new Error("db"));
    const res = await getMeetupDetailWithContacts("m1", "user-1");
    expect(res).toBeNull();
  });
});
