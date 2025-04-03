"use server";

import { z } from "zod";
import { createTaskSchema } from "./schemas";
import { db } from "@/drizzle/db";
import { TasksTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function addTask(
  unsafeData: z.infer<typeof createTaskSchema>
) {
  const { success, data } = createTaskSchema.safeParse(unsafeData);

  if (!success) return "Unable to create task";

  try {
    const [task] = await db
      .insert(TasksTable)
      .values({
        name: data.name,
        description: data.description,
      })
      .returning({ id: TasksTable.id });

    if (!task) return "Unable to create task";
  } catch (error) {
    console.error(error);
    return "Unable to create task";
  }
}

export async function getAllTasks() {
  try {
    const tasks = await db.select().from(TasksTable);
    return tasks;
    console.log(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return []; // ✅ Always return an array to prevent type issues
  }
}

export async function updateTask(
  id: string,
  unsafeData: z.infer<typeof createTaskSchema>
) {
  const { success, data } = createTaskSchema.safeParse(unsafeData);
  if (!success) return "Unable to update task";

  try {
    const [updatedTask] = await db
      .update(TasksTable)
      .set(data)
      .where(eq(TasksTable.id, id))
      .returning();

    if (updatedTask == null) throw new Error("Failed to update user");
    return updatedTask;
  } catch (error) {
    console.error(error);
    return "Unable to update task";
  }
}

export async function deleteTask(id: string) {
  try {
    const [deletedTask] = await db
      .delete(TasksTable)
      .where(eq(TasksTable.id, id))
      .returning();

    if (deletedTask == null) throw new Error("Failed to delete task");
    return deletedTask;
  } catch (error) {
    console.error(error);
    return "Unable to delete task";
  }
}
