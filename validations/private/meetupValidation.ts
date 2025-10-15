import z from "zod";

export const createMeetupSchema = z.object({
  name: z.string(),
  scheduledAt: z.coerce.date(),
});

export type CreateMeetupSchema = z.infer<typeof createMeetupSchema>;
