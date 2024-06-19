"use server";

import { Resend } from "resend";
import { z } from "zod";
const resend = new Resend(process.env.AUTH_RESEND_KEY);

import { ActionError, action } from "@/lib/client";
import { DefaultTemplate } from "@/emails/default-template";
import { mailerSchema } from "./validation";
import { auth } from "@/lib/auth";
import { LoginRequiredError } from "../todo/errors";
import { FarahtyOrganizationError } from "./exceptions";

export const sendMail = action
  .schema(mailerSchema)
  .action(async ({ parsedInput: { to, body, subject, users } }) => {
    const session = await auth();

    if (!session?.user?.id) {
      throw new LoginRequiredError();
    }

    if (!session.user.email?.toLowerCase().endsWith("@farahty.com")) {
      throw new FarahtyOrganizationError();
    }

    if (!subject) {
      subject = "[default]";
    }

    if (!to && !users) {
      throw new ActionError("to array is short");
    }

    let toEmails = to;

    if (users) {
      toEmails = users.map((i) => i.email);
    }

    if (!toEmails) {
      throw new ActionError("to array is short");
    }

    return await resend.emails.send({
      to: toEmails,
      from: "no-reply@farahty.com",
      subject,
      react: <DefaultTemplate text={body} />,
    });
  });

export type SendMail = z.infer<typeof mailerSchema>;
