"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { ITask } from "../api/type";
import EditTask from "../_components/edit-task";
import DeleteTask from "../_components/delete-task";
import Moment from "moment";

export const columns: (props: {
  onTaskEdited: () => void;
  onTaskDeleted: () => void;
}) => ColumnDef<ITask>[] = ({ onTaskEdited, onTaskDeleted }) => [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "task",
    header: "Task",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const task = row.original;

      return (
        <Badge
          className={clsx(
            "inline-flex items-center rounded-md px-2 py-1 text-xs",
            {
              "bg-gray-100 text-gray-500": task.status === "new",
              "bg-yellow-500 text-white": task.status === "progress",
              "bg-green-500 text-white": task.status === "done",
            }
          )}
        >
          {task.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      Moment.locale("en");
      const { date } = row.original;
      return Moment(date).format("dddd, MMMM Do YYYY, h:mm:ss");
    },
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;

      return (
        <div className="flex flex-row justify-start gap-2">
          <EditTask
            id={task.id}
            task={task.task}
            status={task.status}
            date={task.date}
            onTaskEdited={onTaskEdited} // Panggil fetchTasks setelah edit
          />
          <DeleteTask
            id={task.id}
            onTaskDeleted={onTaskDeleted} // Panggil fetchTasks setelah delete
          />
        </div>
      );
    },
  },
];
