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
import { Edit, Plus } from "lucide-react";
import { addTodo, editTodo } from "../api/route";
import { ITask } from "../api/type";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface EditTaskProps {
  onTaskEdited: () => void;
  id: string;
  task: string;
  status: string;
  date: Date;
}

const EditTask: React.FC<EditTaskProps> = ({
  onTaskEdited,
  id,
  task,
  status,
  date,
}) => {
  const [newtask, setTask] = useState<string>(task);
  const [newstatus, setStatus] = useState<string>(status);

  const [open, setOpen] = useState<boolean>(false);

  const handleEditTask = async (e: FormEvent) => {
    e.preventDefault();

    const newTask: ITask = {
      id: id,
      task: newtask,
      status: newstatus,
      date: date,
    };

    try {
      const response = await editTodo(newTask);
      if (response) {
        // Notify parent component to reload data
        onTaskEdited();

        // Close the dialog
        setOpen(false);

        // Reset the task input
        setTask("");
        toast("Task has been updated");
      }
    } catch (error) {
      console.error("Failed to add task:", error);
    }

    console.log(status);
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
          <Edit />
        </ButtonMovingBorder>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleEditTask}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right">
                Task
              </Label>
              <Input
                id="text"
                className="col-span-3"
                value={newtask}
                onChange={(e) => setTask(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right">
                Task
              </Label>
              <RadioGroup
                value={newstatus}
                onValueChange={setStatus}
                className="flex flex-row"
              >
                <div className="flex items-center space-x-2 ">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new">New</Label>
                </div>
                <div className="flex items-center space-x-2 ">
                  <RadioGroupItem value="progress" id="progress" />
                  <Label htmlFor="progress">Progress</Label>
                </div>
                <div className="flex items-center space-x-2 ">
                  <RadioGroupItem value="done" id="done" />
                  <Label htmlFor="done">Done</Label>
                </div>
              </RadioGroup>
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

export default EditTask;
