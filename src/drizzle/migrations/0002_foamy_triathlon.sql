CREATE TYPE "public"."task_status" AS ENUM('todo', 'pending', 'in_progress', 'completed');--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "status" "task_status" DEFAULT 'todo' NOT NULL;