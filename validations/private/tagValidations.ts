import z from "zod";

export const tagSchema = z.object({
  name: z
    .string()
    .min(1, "tag名を入力してください")
    .max(20, "20文字以内にしてください"),
});

export type TagSchema = z.infer<typeof tagSchema>;
