import { coerceFormValue } from "@conform-to/zod/v4/future";
import z from "zod";
export const createContactsFrontSchema = z
  .object({
    name: z.string().min(1, "入力してください"),
    company: z.string().optional(),
    role: z.string().optional(),
    description: z.string().optional(),
    tags: z
      .array(z.string())
      .max(5, "タグは五つ以内にしてください")
      .refine((tags) => new Set(tags).size === tags.length, {
        message: "タグが重複しています",
      })
      .max(5)
      .optional(),
    githubHandle: z.string().optional(),
    githubId: z.string().optional(),
    twitterHandle: z.string().optional(),
    twitterId: z.string().optional(),
    websiteHandle: z.string().optional(),
    websiteUrl: z.string().optional(),
    productHandle: z.string().optional(),
    productUrl: z.string().optional(),
    otherHandle: z.string().optional(),
    other: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.githubHandle && !data.githubId) return false;
      return true;
    },
    {
      message: "GitHubハンドル入力時はIDも必須です",
      path: ["githubId"],
    },
  )
  .refine(
    (data) => {
      if (data.twitterHandle && !data.twitterId) return false;
      return true;
    },
    {
      message: "twitterハンドル入力時はIDも必須です",
      path: ["twitterId"],
    },
  )
  .refine(
    (data) => {
      if (data.websiteHandle && !data.websiteUrl) return false;
      return true;
    },
    {
      message: "websiteハンドル入力時はIDも必須です",
      path: ["websiteUrl"],
    },
  )
  .refine(
    (data) => {
      if (data.otherHandle && !data.other) return false;
      return true;
    },
    {
      message: "otherハンドル入力時はIDも必須です",
      path: ["other"],
    },
  );
export const contactsActionSchema = coerceFormValue(createContactsFrontSchema);
export type CreateContactsSchema = z.infer<typeof createContactsFrontSchema>;
export type ContactFormFieldName = keyof CreateContactsSchema;
