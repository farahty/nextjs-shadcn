import { timestamp, pgTable, text, uuid, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./auth";
import { relations } from "drizzle-orm";

export const todos = pgTable("todo", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  text: text("text").notNull(),
  isCompleted: boolean("isCompleted"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
});

export const todosUsers = relations(todos, ({ one }) => ({
  user: one(users, { fields: [todos.userId], references: [users.id] }),
}));

export const todoZodSchema = {
  input: createInsertSchema(todos, { text: z.string().min(3) }),
  select: createSelectSchema(todos, {}),
  query: z.object({}).optional(),
};

export type Todo = z.infer<typeof todoZodSchema.select>;
export type TodoInput = z.infer<typeof todoZodSchema.input>;
