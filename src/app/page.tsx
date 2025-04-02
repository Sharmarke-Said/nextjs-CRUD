import { Button } from "@/components/ui/button";
import Link from "next/link";
import TasksTable from "@/components/TasksTable";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <h1>Nexjs CRUD</h1>
      <Button asChild>
        <Link href="/tasks">Add Task</Link>
      </Button>
      <TasksTable />
    </main>
  );
}
