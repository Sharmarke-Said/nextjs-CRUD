import { AddTaskForm } from "@/components/AddTaskForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AddTask() {
  return (
    <div className="container mx-auto p-4 max-wd-[750px]">
      <Card>
        <CardHeader>
          <CardTitle>Add Task</CardTitle>
          <CardContent>
            <AddTaskForm />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
