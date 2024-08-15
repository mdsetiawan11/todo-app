"use client";
import React, { useEffect, useState } from "react";
import { ButtonMovingBorder } from "@/components/ui/moving-border";
import AddTask from "../_components/add-task";
import { getAllTodo } from "../api/route";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function Todo() {
  const [tasks, setTasks] = useState<any[]>([]); // Adjust type if needed

  const fetchTasks = async () => {
    const tasks = await getAllTodo();
    setTasks(tasks);
    console.log(tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="w-full h-full bg-gray-200 dark:bg-gray-600 p-6">
      <div className="flex flex-row justify-between">
        <ButtonMovingBorder
          borderRadius="0.5rem"
          className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Todo
        </ButtonMovingBorder>
        <AddTask onTaskAdded={fetchTasks} />
      </div>
      <div className="mt-5">
        <DataTable
          columns={columns({
            onTaskEdited: fetchTasks,
            onTaskDeleted: fetchTasks,
          })}
          data={tasks}
        />
      </div>
    </div>
  );
}
