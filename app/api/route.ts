

import { ITask } from "./type";

const baseUrl = "http://localhost:3001";

export const getAllTodo = async (): Promise<ITask[]> => {
    const res = await fetch(`${baseUrl}/tasks `)
    const todos = await res.json()
    return todos;
}

export const addTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    const newTodo = await res.json();
    return newTodo;
}

export const editTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    const updatedTodo = await res.json();
    return updatedTodo;
}

export const deleteTodo = async (id: string): Promise<void> => {
    await fetch(`${baseUrl}/tasks/${id}`, {
        method: 'DELETE',
    })
}

export const getTasksCount = async (): Promise<number> => {
    const res = await fetch(`${baseUrl}/tasks `)
    const todos = await res.json()
    const tasksCount = todos.length;
    return tasksCount;
}

export const getTasksCountNew = async (): Promise<number> => {
    const res = await fetch(`${baseUrl}/tasks`)
    const todos = await res.json()

    // Filter tasks dengan status 'new'
    const newTasks = todos.filter((task: ITask) => task.status === 'new')

    // Menghitung jumlah tasks dengan status 'new'
    const tasksCount = newTasks.length;
    return tasksCount;
}

export const getTasksCountProgress = async (): Promise<number> => {
    const res = await fetch(`${baseUrl}/tasks`)
    const todos = await res.json()

    // Filter tasks dengan status 'new'
    const newTasks = todos.filter((task: ITask) => task.status === 'progress')

    // Menghitung jumlah tasks dengan status 'new'
    const tasksCount = newTasks.length;
    return tasksCount;
}

export const getTasksCountDone = async (): Promise<number> => {
    const res = await fetch(`${baseUrl}/tasks`)
    const todos = await res.json()

    // Filter tasks dengan status 'new'
    const newTasks = todos.filter((task: ITask) => task.status === 'done')

    // Menghitung jumlah tasks dengan status 'new'
    const tasksCount = newTasks.length;
    return tasksCount;
}