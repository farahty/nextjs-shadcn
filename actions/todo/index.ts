"use server";

import db from "@/db";
import { todoZodSchema, todos } from "@/db/todo";
import { auth } from "@/lib/auth";
import { action } from "@/lib/client";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { LoginRequiredError } from "./errors";

export const find = action
  .schema(todoZodSchema.query)
  .action(async ({ parsedInput }) => {
    const session = await auth();

    if (!session?.user?.id) {
      return [];
    }

    return await db.query.todos.findMany({
      orderBy: desc(todos.createdAt),
      where: eq(todos.userId, session.user.id as string),
      with: {
        user: true,
      },
    });
  });

export const create = action
  .schema(todoZodSchema.input)
  .action(async ({ parsedInput: todo }) => {
    const session = await auth();

    if (!session?.user?.id) {
      throw new LoginRequiredError();
    }

    const results = await db
      .insert(todos)
      .values({ ...todo, userId: session.user.id })
      .returning();
    revalidatePath("/");

    return results;
  });

export const remove = action
  .schema(z.string())
  .action(async ({ parsedInput: id }) => {
    const results = await db.delete(todos).where(eq(todos.id, id));
    revalidatePath("/");
    return results.rowCount && results.rowCount > 0;
  });

export const toggle = action
  .schema(z.object({ id: z.string(), state: z.boolean() }))
  .action(async ({ parsedInput: { id, state } }) => {
    const results = await db
      .update(todos)
      .set({ isCompleted: state })
      .where(eq(todos.id, id ?? ""));

    //revalidatePath("/");

    return results.rowCount && results.rowCount > 0;
  });
