import z from "zod";

export const createMeetupSchema = z.object({
  name: z.string(),
  scheduledAt: z.coerce.date(),
});

//form用
export type CreateMeetupFormValues = z.input<typeof createMeetupSchema>;

//action用
export type CreateMeetupSchema = z.infer<typeof createMeetupSchema>;
