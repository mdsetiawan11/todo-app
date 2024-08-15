"use client";
import { ButtonMovingBorder } from "@/components/ui/moving-border";
import {
  ActivityIcon,
  CheckCircle,
  ListCheck,
  RefreshCcwDot,
} from "lucide-react";
import {
  CardShadcn,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  getAllTodo,
  getTasksCount,
  getTasksCountDone,
  getTasksCountNew,
  getTasksCountProgress,
} from "../api/route";
import { CardStack } from "@/components/ui/card-stack";
import { cn } from "@/lib/utils";
import Moment from "moment";

export default function Dashboard() {
  const [tasksCount, setTasksCount] = useState<number>(0);
  const [tasksCountNew, setTasksCountNew] = useState<number>(0);
  const [tasksCountProgresss, setTasksCountProgress] = useState<number>(0);
  const [tasksCountDone, setTasksCountdone] = useState<number>(0);

  const Cards2: {
    id: number;
    name: string;
    designation: string;
    content: string;
  }[] = [];

  const fetchTasks = async () => {
    const tasks = await getAllTodo();
    interface CardforStack {
      id: number;
      name: string;
      designation: string;
      content: string;
    }
    if (tasks) {
      tasks.map((task, index) => {
        const card99: CardforStack = {
          id: index + 1,
          name: task.status,
          designation: Moment(task.date).format(" MMMM Do YYYY, h:mm:ss") || "",
          content: task.task,
        };

        Cards2.push(card99);
      });
    }
  };

  const fetchTasksCount = async () => {
    const alltasks = await getTasksCount();
    setTasksCount(alltasks);
  };

  const fetchTasksCountNew = async () => {
    const newtasks = await getTasksCountNew();
    setTasksCountNew(newtasks);
  };

  const fetchTasksCountProgress = async () => {
    const progresstasks = await getTasksCountProgress();
    setTasksCountProgress(progresstasks);
  };

  const fetchTasksCountDone = async () => {
    const donetasks = await getTasksCountDone();
    setTasksCountdone(donetasks);
  };

  useEffect(() => {
    fetchTasks();
    fetchTasksCount();
    fetchTasksCountNew();
    fetchTasksCountProgress();
    fetchTasksCountDone();
  }, []);

  return (
    <div className="w-full h-full bg-gray-200 p-6">
      <ButtonMovingBorder
        borderRadius="0.5rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 font-bold"
      >
        Dashboard
      </ButtonMovingBorder>

      <div className="flex flex-1 flex-col gap-4 mt-5 md:gap-8 ">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <CardShadcn x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks</CardTitle>
              <ListCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasksCount}</div>
            </CardContent>
          </CardShadcn>
          <CardShadcn x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New</CardTitle>
              <ActivityIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasksCountNew}</div>
            </CardContent>
          </CardShadcn>
          <CardShadcn x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In-Progress</CardTitle>
              <RefreshCcwDot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasksCountProgresss}</div>
            </CardContent>
          </CardShadcn>
          <CardShadcn x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Done</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasksCountDone}</div>
            </CardContent>
          </CardShadcn>
        </div>
      </div>

      {/* <CardStack items={Cards2} /> */}
    </div>
  );
}

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};
