import z from "zod";

//TODO これを使っているものをmeetupServerSchema に変更する
export const createMeetupSchema = z.object({
  name: z.string().min(1, "ミートアップ名を入力してください"),
  scheduledAt: z.coerce.date("日付が不正です"),
});

const meetupBaseSchema = z.object({
  name: z.string().min(1, "ミートアップ名を入力してください"),
});

export const meetupClientSchema = meetupBaseSchema.extend({
  scheduledAt: z.date("日付が不正です"),
});

export const meetupServerSchema = meetupClientSchema.extend({
  scheduledAt: z.coerce.date("日付が不正です"),
});

//form用
export type MeetupClientSchema = z.input<typeof meetupClientSchema>;

//action用
export type CreateMeetupSchema = z.infer<typeof createMeetupSchema>;
