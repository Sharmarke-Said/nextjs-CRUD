"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { getAllTasks, deleteTask } from "@/lib/actions";
import { Pencil, Trash, Plus } from "lucide-react";
import { AddTaskForm } from "./AddTaskForm";
import { EditTaskForm } from "./EditTaskForm";

type TaskSchema = {
  id: string;
  name: string;
  description: string;
  createdAt: string | Date | null;
};

export default function TasksTable() {
  const [tasks, setTasks] = useState<TaskSchema[]>([]);
  const [editTask, setEditTask] = useState<TaskSchema | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(
    null
  );

  useEffect(() => {
    async function fetchTasks() {
      const data = await getAllTasks();
      if (Array.isArray(data)) setTasks(data);
    }
    fetchTasks();
  }, []);

  const refreshTasks = async () => {
    const updatedTasks = await getAllTasks();
    if (Array.isArray(updatedTasks)) setTasks(updatedTasks);
  };

  const handleEdit = (task: TaskSchema) => {
    setEditTask(task);
    setIsEditOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTaskId) return;

    await deleteTask(deleteTaskId);
    setDeleteTaskId(null);
    refreshTasks();
  };

  return (
    <div className="border rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tasks List</h2>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> New Task
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  {task.createdAt
                    ? new Date(task.createdAt).toLocaleString()
                    : "N/A"}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(task)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteTaskId(task.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No tasks found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Add Task Modal */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          <AddTaskForm
            onSuccess={() => {
              setIsAddOpen(false); // Close modal
              refreshTasks(); // Refresh task list
            }}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Task Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editTask && (
            <EditTaskForm
              task={editTask}
              onSuccess={() => {
                setIsEditOpen(false);
                refreshTasks();
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={!!deleteTaskId}
        onOpenChange={() => setDeleteTaskId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this task?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteTaskId(null)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
