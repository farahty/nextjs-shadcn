import { timestamp, pgTable, text, uuid, boolean } from "drizzle-orm/pg-core";

export const todos = pgTable("todo", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  text: text("text"),
  isCompleted: boolean("isCompleted"),
  createdAt: timestamp("createdAt", { mode: "date" }),
});

export type Todo = typeof todos.$inferSelect;
export type TodoInput = typeof todos.$inferInsert;
