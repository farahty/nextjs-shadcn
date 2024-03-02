"use server";

import db from "@/db";
import { todoZodSchema, todos } from "@/db/todo";
import { action } from "@/lib/client";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const find = action(todoZodSchema.query, async (query) => {
  return await db.select().from(todos).orderBy(desc(todos.createdAt));
});

export const create = action(todoZodSchema.input, async (todo) => {
  const results = await db.insert(todos).values(todo);

  revalidatePath("/");

  return JSON.parse(JSON.stringify(results));
});

export const remove = action(z.string(), async (id) => {
  const results = await db.delete(todos).where(eq(todos.id, id));
  revalidatePath("/");
  return results.rowCount && results.rowCount > 0;
});

export const toggle = action(
  z.object({ id: z.string(), state: z.boolean() }),
  async ({ id, state }) => {
    const results = await db
      .update(todos)
      .set({ isCompleted: state })
      .where(eq(todos.id, id));

    //revalidatePath("/");

    return results.rowCount && results.rowCount > 0;
  }
);
