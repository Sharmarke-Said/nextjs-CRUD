"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { updateTaskSchema } from "@/lib/schemas";
import { updateTask } from "@/lib/actions";

type EditTaskFormProps = {
  task: z.infer<typeof updateTaskSchema> & { id: string };
  onSuccess: () => void;
};

export function EditTaskForm({ task, onSuccess }: EditTaskFormProps) {
  const [error, setError] = useState<string>();
  const form = useForm<z.infer<typeof updateTaskSchema>>({
    defaultValues: {
      name: task.name,
      description: task.description,
      status: task.status,
    },
  });

  async function onSubmit(data: z.infer<typeof updateTaskSchema>) {
    const result = await updateTask(task.id, data);
    if (typeof result === "string") {
      setError(result); // If an error message is returned, display it.
    } else {
      setError(""); // Clear previous errors
      onSuccess(); // Close modal and refresh tasks
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {error && <p className="text-destructive">{error}</p>}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="todo">To Do</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update Task</Button>
      </form>
    </Form>
  );
}
