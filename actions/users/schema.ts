import * as z from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(4),
  secondName: z.string(),
  dob: z.date(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
