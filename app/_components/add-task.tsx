"use client";
import { useState, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonMovingBorder } from "@/components/ui/moving-border";
import { Plus } from "lucide-react";
import { addTodo } from "../api/route";
import { ITask } from "../api/type";

interface AddTaskProps {
  onTaskAdded: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onTaskAdded }) => {
  const [task, setTask] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false); // State to manage dialog open

  const handleAddTask = async (e: FormEvent) => {
    e.preventDefault();

    const newTask: ITask = {
      id: uuidv4(), // Generate unique UUID
      task: task,
      status: "new", // Default status
      date: new Date(),
    };

    try {
      const response = await addTodo(newTask);
      if (response) {
        // Notify parent component to reload data
        onTaskAdded();

        // Close the dialog
        setOpen(false);

        // Reset the task input
        setTask("");
      }
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonMovingBorder
          borderRadius="0.5rem"
          borderClassName="w-10 h-10"
          containerClassName="w-10 h-10"
          className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          <Plus />
        </ButtonMovingBorder>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAddTask}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right">
                Task
              </Label>
              <Input
                id="text"
                className="col-span-3"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
