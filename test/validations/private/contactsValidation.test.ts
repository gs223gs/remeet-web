import { describe, it, expect } from "vitest";

import { createContactsFrontSchema } from "@/validations/private/contactsValidation";

describe("createContactsSchema", () => {
  it("必須最小項目のみで成功する", () => {
    const input = {
      name: "Alice",
    };
    const res = createContactsFrontSchema.safeParse(input);
    expect(res.success).toBe(true);
  });

  it("name が空文字だと失敗する", () => {
    const input = {
      name: "",
    };
    const res = createContactsFrontSchema.safeParse(input);
    expect(res.success).toBe(false);
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
    const res = createContactsFrontSchema.safeParse(input);
    expect(res.success).toBe(true);
  });

  it("githubHandle があるのに githubId がない場合は失敗する", () => {
    const input = {
      name: "Alice",
      githubHandle: "alice",
    };
    const res = createContactsFrontSchema.safeParse(input);
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
    const res = createContactsFrontSchema.safeParse(input);
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
    const res = createContactsFrontSchema.safeParse(input);
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
    const res = createContactsFrontSchema.safeParse(input);
    expect(res.success).toBe(false);
    if (!res.success) {
      const issue = res.error.issues.find((i) => i.path.join(".") === "other");
      expect(issue).toBeTruthy();
    }
  });

  it("tags に同一タグ文字列が含まれると失敗する", () => {
    const input = {
      name: "Alice",
      tags: ["t1", "t1"],
    };
    const res = createContactsFrontSchema.safeParse(input);
    expect(res.success).toBe(false);
  });

  it("tags が全て異なり件数が仕様どおりなら成功する", () => {
    const input = {
      name: "Alice",
      tags: ["t1", "t2", "t3", "t4", "t5"],
    };
    const res = createContactsFrontSchema.safeParse(input);
    expect(res.success).toBe(true);
  });

  it("tags が未指定でも成功する", () => {
    const input = {
      name: "Alice",
    };
    const res = createContactsFrontSchema.safeParse(input);
    expect(res.success).toBe(true);
  });

  it("tags が空配列でも成功する（最大5件のため）", () => {
    const input = {
      name: "Alice",
      tags: [],
    };
    const res = createContactsFrontSchema.safeParse(input);
    expect(res.success).toBe(true);
  });

  it("tags の件数が6以上なら失敗する（最大5件）", () => {
    const input4 = { name: "Alice", tags: ["t1", "t2", "t3", "t4"] };
    const input6 = {
      name: "Alice",
      tags: ["t1", "t2", "t3", "t4", "t5", "t6"],
    };
    expect(createContactsFrontSchema.safeParse(input4).success).toBe(true);
    expect(createContactsFrontSchema.safeParse(input6).success).toBe(false);
  });

  it("productHandle のみ指定でも成功する（依存関係なし）", () => {
    const input = {
      name: "Alice",
      productHandle: "p",
    };
    const res = createContactsFrontSchema.safeParse(input);
    expect(res.success).toBe(true);
  });
});
