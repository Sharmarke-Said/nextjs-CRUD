"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { db } from "@/drizzle/db";
import { TasksTable, taskStatusEnum } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

const taskSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(taskStatusEnum.enumValues).default("pending"),
});

export async function createTask(
  unsafeData: z.infer<typeof taskSchema>
) {
  const { success, data } = taskSchema.safeParse(unsafeData);
  if (!success) return "Invalid task data";

  try {
    await db.insert(TasksTable).values(data);
  } catch {
    return "Unable to create task";
  }
  redirect("/");
}

export async function updateTask(
  id: string,
  unsafeData: Partial<z.infer<typeof taskSchema>>
) {
  const { success, data } = taskSchema
    .partial()
    .safeParse(unsafeData);
  if (!success) return "Invalid task data";

  try {
    await db
      .update(TasksTable)
      .set(data)
      .where(eq(TasksTable.id, id));
  } catch {
    return "Unable to update task";
  }
  redirect("/");
}

export async function deleteTask(id: string) {
  try {
    await db.delete(TasksTable).where(eq(TasksTable.id, id));
  } catch {
    return "Unable to delete task";
  }
  redirect("/");
}
