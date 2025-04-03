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
import { createTaskSchema } from "../lib/schemas";
import { addTask } from "../lib/actions";

export function AddTaskForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [error, setError] = useState<string>();
  const form = useForm<z.infer<typeof createTaskSchema>>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // async function onSubmit(data: z.infer<typeof createTaskSchema>) {
  //   const error = await addTask(data);
  //   setError(error);
  // }
  async function onSubmit(data: z.infer<typeof createTaskSchema>) {
    const error = await addTask(data);
    if (!error) {
      form.reset(); // Reset form fields after successful submission
      onSuccess(); // Close the modal and refresh tasks
    } else {
      setError(error);
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

        <Button type="submit">Add Task</Button>
      </form>
    </Form>
  );
}
