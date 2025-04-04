import { z } from "zod";

export const createTaskSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export const updateTaskSchema = createTaskSchema.extend({
  status: z.enum(["todo", "pending", "in_progress", "completed"]),
});
