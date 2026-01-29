import { describe, expect, it } from "vitest";

import { convertInsertableLinks } from "@/app/(private)/dashboard/meetup/[meetupId]/contacts/_logic/convertInsertableLinks";

describe("convertInsertableLinks", () => {
  it("正常系: リンク入力がなければ空配列を返す", () => {
    // Arrange
    const input = {
      name: "更新後",
    };

    // Act
    const result = convertInsertableLinks(input);

    // Assert
    expect(result).toEqual([]);
  });

  it("正常系: ハンドル付きリンクはhandleを含める", () => {
    // Arrange
    const input = {
      name: "更新後",
      githubId: "https://github.com/example",
      githubHandle: "example",
    };

    // Act
    const result = convertInsertableLinks(input);

    // Assert
    expect(result).toEqual([
      {
        type: "GITHUB",
        url: "https://github.com/example",
        handle: "example",
      },
    ]);
  });

  it("正常系: ハンドルなしリンクはhandleを含めない", () => {
    // Arrange
    const input = {
      name: "更新後",
      websiteUrl: "https://example.com",
    };

    // Act
    const result = convertInsertableLinks(input);

    // Assert
    expect(result).toEqual([
      {
        type: "WEBSITE",
        url: "https://example.com",
      },
    ]);
    expect("handle" in result[0]).toBe(false);
  });

  it("正常系: 複数リンクを順序通りに返す", () => {
    // Arrange
    const input = {
      name: "更新後",
      githubId: "https://github.com/example",
      twitterId: "https://x.com/example",
      websiteUrl: "https://example.com",
      other: "https://other.example.com",
      productUrl: "https://product.example.com",
    };

    // Act
    const result = convertInsertableLinks(input);

    // Assert
    expect(result).toEqual([
      {
        type: "GITHUB",
        url: "https://github.com/example",
      },
      {
        type: "TWITTER",
        url: "https://x.com/example",
      },
      {
        type: "WEBSITE",
        url: "https://example.com",
      },
      {
        type: "OTHER",
        url: "https://other.example.com",
      },
      {
        type: "PRODUCT",
        url: "https://product.example.com",
      },
    ]);
  });
});
