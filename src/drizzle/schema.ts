import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const taskStatuses = [
  "todo",
  "pending",
  "in_progress",
  "completed",
] as const;
export type TaskStatus = (typeof taskStatuses)[number];
export const taskStatusEnum = pgEnum("task_status", taskStatuses);

export const TasksTable = pgTable("tasks", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text().notNull(),
  status: taskStatusEnum().notNull().default("todo"),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).$onUpdate(
    () => new Date()
  ),
});
