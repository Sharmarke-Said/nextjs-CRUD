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
import {
  getAllTasks,
  updateTask,
  deleteTask,
} from "@/app/tasks/actions";
import { Pencil, Trash } from "lucide-react";

type TaskSchema = {
  id: string;
  name: string;
  description: string;
  createdAt: string | Date | null;
};

export default function TableComponent() {
  const [tasks, setTasks] = useState<TaskSchema[]>([]);
  const [editTask, setEditTask] = useState<TaskSchema | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
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

  const handleEdit = (task: TaskSchema) => {
    setEditTask(task);
    setIsEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!editTask) return;

    const response = await updateTask(editTask.id, {
      name: editTask.name,
      description: editTask.description,
    });

    console.log(response);
    setIsEditOpen(false);

    // Refresh tasks after update
    const updatedTasks = await getAllTasks();
    if (Array.isArray(updatedTasks)) setTasks(updatedTasks);
  };

  const handleDelete = async () => {
    if (!deleteTaskId) return;

    const response = await deleteTask(deleteTaskId);
    console.log(response);

    setDeleteTaskId(null);

    // Refresh tasks after delete
    const updatedTasks = await getAllTasks();
    if (Array.isArray(updatedTasks)) setTasks(updatedTasks);
  };

  return (
    <div className="border rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Tasks List</h2>
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

      {/* Edit Task Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editTask && (
            <div className="flex flex-col gap-4">
              <input
                className="border p-2 rounded"
                value={editTask.name}
                onChange={(e) =>
                  setEditTask(
                    (prev) =>
                      prev && { ...prev, name: e.target.value }
                  )
                }
                placeholder="Task Name"
              />
              <input
                className="border p-2 rounded"
                value={editTask.description}
                onChange={(e) =>
                  setEditTask(
                    (prev) =>
                      prev && { ...prev, description: e.target.value }
                  )
                }
                placeholder="Task Description"
              />
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Update</Button>
          </DialogFooter>
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
