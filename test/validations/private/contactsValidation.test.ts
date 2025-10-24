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

  it("name が空文字だと失敗する", () => {
    const input = {
      name: "",
    };
    const res = createContactsSchema.safeParse(input);
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

  it("tags に同一タグ文字列が含まれると失敗する", () => {
    const input = {
      name: "Alice",
      tags: ["t1", "t1"],
    };
    const res = createContactsSchema.safeParse(input);
    expect(res.success).toBe(false);
  });

  it("tags が全て異なり件数が仕様どおりなら成功する", () => {
    const input = {
      name: "Alice",
      tags: ["t1", "t2", "t3", "t4", "t5"],
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

  it("tags の要素に空文字が含まれると失敗する", () => {
    const input = {
      name: "Alice",
      tags: ["t1", ""],
    };
    const res = createContactsSchema.safeParse(input);
    expect(res.success).toBe(false);
  });

  it("tags の件数が5以外なら失敗する", () => {
    const input4 = { name: "Alice", tags: ["t1", "t2", "t3", "t4"] };
    const input6 = {
      name: "Alice",
      tags: ["t1", "t2", "t3", "t4", "t5", "t6"],
    };
    expect(createContactsSchema.safeParse(input4).success).toBe(false);
    expect(createContactsSchema.safeParse(input6).success).toBe(false);
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
