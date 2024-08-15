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
import { Edit, Plus, Trash } from "lucide-react";
import { addTodo, deleteTodo, editTodo } from "../api/route";
import { ITask } from "../api/type";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DialogDescription } from "@radix-ui/react-dialog";

interface DeleteTaskProps {
  onTaskDeleted: () => void;
  id: string;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ onTaskDeleted, id }) => {
  const [idtask, setId] = useState<string>(id);
  const [open, setOpen] = useState<boolean>(false);

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTodo(id);

      // Close the dialog
      setOpen(false);

      onTaskDeleted();

      // Reset the task input
      setId("");
    } catch (error) {
      console.error("Failed to delete task:", error);
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
          <Trash />
        </ButtonMovingBorder>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>

        <DialogDescription>Are you sure ?</DialogDescription>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => handleDeleteTask(id)}>Yes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTask;
