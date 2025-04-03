import TasksTable from "@/components/TasksTable";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Nextjs CRUD</h1>
      {/* <h1>Nexjs CRUD</h1> */}
      {/* <Button asChild>
        <Link href="/tasks">Add Task</Link>
      </Button> */}
      <TasksTable />
    </main>
  );
}
