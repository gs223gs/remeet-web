import { describe, it, expect } from "vitest";
import { createContactsSchema } from "@/validations/private/contactsValidation";

describe("createContactsSchema", () => {
  it("必須最小項目のみで成功する", () => {
    const input = {
      name: "Alice",
    };
    const res = createContactsSchema.safeParse(input);
    expect(res.success).toBe(true);
  });

  it("各ハンドルと対応ID(またはURL)が両方あれば成功する", () => {
    const input = {
      name: "Alice",
      githubHandle: "alice",
      githubId: "123",
      twitterHandle: "alice_t",
      twitterId: "456",
      websiteHandle: "site",
      websiteUrl: "https://example.com",
      productHandle: "prod",
      productUrl: "https://example.com/p",
      otherHandle: "otherh",
      other: "othervalue",
    };
    const res = createContactsSchema.safeParse(input);
    expect(res.success).toBe(true);
  });

  it("githubHandle があるのに githubId がない場合は失敗する", () => {
    const input = {
      name: "Alice",
      githubHandle: "alice",
    };
    const res = createContactsSchema.safeParse(input);
    expect(res.success).toBe(false);
    if (!res.success) {
      const issue = res.error.issues.find(
        (i) => i.path.join(".") === "githubId",
      );
      expect(issue).toBeTruthy();
    }
  });

  it("twitterHandle があるのに twitterId がない場合は失敗する", () => {
    const input = {
      name: "Alice",
      twitterHandle: "alice",
    };
    const res = createContactsSchema.safeParse(input);
    expect(res.success).toBe(false);
    if (!res.success) {
      const issue = res.error.issues.find(
        (i) => i.path.join(".") === "twitterId",
      );
      expect(issue).toBeTruthy();
    }
  });

  it("websiteHandle があるのに websiteUrl がない場合は失敗する", () => {
    const input = {
      name: "Alice",
      websiteHandle: "site",
    };
    const res = createContactsSchema.safeParse(input);
    expect(res.success).toBe(false);
    if (!res.success) {
      const issue = res.error.issues.find(
        (i) => i.path.join(".") === "websiteUrl",
      );
      expect(issue).toBeTruthy();
    }
  });

  it("otherHandle があるのに other がない場合は失敗する", () => {
    const input = {
      name: "Alice",
      otherHandle: "oh",
    };
    const res = createContactsSchema.safeParse(input);
    expect(res.success).toBe(false);
    if (!res.success) {
      const issue = res.error.issues.find((i) => i.path.join(".") === "other");
      expect(issue).toBeTruthy();
    }
  });

  it("tags に同一 id が含まれると失敗する", () => {
    const input = {
      name: "Alice",
      tags: [{ id: "t1" }, { id: "t1" }], // 別オブジェクトだが id が同じ
    };
    const res = createContactsSchema.safeParse(input);
    expect(res.success).toBe(false);
  });

  it("tags の id がすべて異なり件数が仕様どおりなら成功する", () => {
    const input = {
      name: "Alice",
      tags: [
        { id: "t1" },
        { id: "t2" },
        { id: "t3" },
        { id: "t4" },
        { id: "t5" },
      ],
    };
    const res = createContactsSchema.safeParse(input);
    expect(res.success).toBe(true);
  });

  it("tags が未指定でも成功する", () => {
    const input = {
      name: "Alice",
    };
    const res = createContactsSchema.safeParse(input);
    expect(res.success).toBe(true);
  });

  it("tags が空配列の場合は失敗する（長さ要件）", () => {
    const input = {
      name: "Alice",
      tags: [],
    };
    const res = createContactsSchema.safeParse(input);
    expect(res.success).toBe(false);
  });

  it("productHandle のみ指定でも成功する（依存関係なし）", () => {
    const input = {
      name: "Alice",
      productHandle: "p",
    };
    const res = createContactsSchema.safeParse(input);
    expect(res.success).toBe(true);
  });
});
