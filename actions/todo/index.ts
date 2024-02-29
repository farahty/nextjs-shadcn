"use server";

import db from "@/db";
import { todos } from "@/db/todo";
import { asc } from "drizzle-orm";

export const getTodos = async () => {
  return await db.select().from(todos).orderBy(asc(todos.id));
};

export const addTodo = async (text: string) => {
  return await db.insert(todos).values({ text });
};
