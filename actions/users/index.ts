"use server";

import db from "@/db";
import { userZodSchema, users } from "@/db/auth";
import { ActionError, action } from "@/lib/client";
import { and, eq, ilike, or } from "drizzle-orm";
import { EmailIsUsedError } from "./errors";
import * as bcrypt from "bcrypt";
import { z } from "zod";
import { validateReCaptcha } from "@/lib/re-captcha";
import { signIn } from "@/lib/auth";

export const register = action
  .schema(userZodSchema.input)
  .action(async ({ parsedInput: inputs }) => {
    await validateReCaptcha(inputs.recaptcha);

    const found = await db
      .select()
      .from(users)
      .where(eq(users.email, inputs.email.toLowerCase()))
      .then((res) => res[0] ?? null);

    if (found) {
      throw new EmailIsUsedError();
    }

    const hashedPassword = await bcrypt.hash(inputs.password!, 10);

    await db
      .insert(users)
      .values({ ...inputs, password: hashedPassword })
      .returning();

    await signIn("credentials", {
      email: inputs.email,
      password: inputs.password,
      redirectTo: "/",
      redirect: true,
    });
  });

export const findUsers = action
  .schema(
    z
      .object({
        keyword: z.string().optional(),
        name: z.string().optional(),
        email: z.string().optional(),
      })
      .optional()
  )
  .action(async ({ parsedInput: findBy }) => {
    let query = and();

    if (findBy?.email) {
      const email = ilike(users.email, `%${findBy.email}%`);
      query = and(query, email);
    }

    if (findBy?.name) {
      const name = ilike(users.name, `%${findBy.name}%`);
      query = and(query, name);
    }

    if (findBy?.keyword) {
      const email = ilike(users.email, `%${findBy.keyword}%`);
      const name = ilike(users.name, `%${findBy.keyword}%`);
      query = and(query, or(email, name));
    }

    return await db.select().from(users).where(query);
  });
