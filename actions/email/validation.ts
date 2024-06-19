import { z } from "zod";

export const mailerSchema = z
  .object({
    to: z.string().email().array().optional(),
    users: z.object({ email: z.string().email() }).array().optional(),
    subject: z.string().min(3).max(40).optional(),
    body: z.string().min(3),
  })
  .refine(
    ({ to, users }) => {
      if (!to && !users) {
        return false;
      }

      if (to && to.length > 0) {
        return true;
      }

      if (users && users.length > 0) {
        return true;
      }

      return false;
    },
    {
      path: ["users"],
      message: "Select at least on sender",
    }
  );
