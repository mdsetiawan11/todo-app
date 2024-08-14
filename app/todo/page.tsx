import React from "react";

import { ButtonMovingBorder } from "@/components/ui/moving-border";

import TodoTable from "./todo-table";
import AddTask from "../_components/add-task";

export default function Todo() {
  return (
    <div className="w-full h-full bg-gray-200 dark:bg-gray-600 p-6">
      <div className="flex flex-row justify-between">
        <ButtonMovingBorder
          borderRadius="0.5rem"
          className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Todo
        </ButtonMovingBorder>
        <AddTask />
      </div>
      <TodoTable />
    </div>
  );
}
