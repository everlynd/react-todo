import create, { State, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

import { generateId, generateSubId } from '../helpers'

interface Task {
    id: string;
    title: string;
    createdAt: number;
    subTask: SubTask[];
}

interface SubTask {
    id: string;
    title: string;
    description: string;
    createdAt: number;
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
    createSubTask: (title: string, parentId: string, description: string) => void;
    removeSubTask: (id: string, parentId: string) => void;
}

const isToDoStore = (obj: any): obj is ToDoStore => {
    return 'tasks' in obj;
}


const localStorageUpdate = <T extends State>(config: StateCreator<T>):
 StateCreator<T> => (set, get, api) => config((nextState, ...args) => {
     if (isToDoStore(nextState)) {
        window.localStorage.setItem('tasks', JSON.stringify(
            nextState.tasks
        ))
    }
    set(nextState, ...args);
},get, api)

const getCurrentState = () => {
    try {
        return (JSON.parse(localStorage.getItem('tasks') || '[]')) as Task[]
    } catch (error) {
        window.localStorage.setItem('tasks', '[]')
    }
    return [];
}


export const useToDoStore = create<ToDoStore>(localStorageUpdate(devtools((set, get) => ({
    tasks: getCurrentState(),
    createTask: (title: string) => {
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now(),
            subTask: [] as SubTask[]
        }
        set({
            tasks: [newTask].concat(tasks),
        })
    },
    updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title,
            }))
        })
    },
    removeTask: (id: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter(task => task.id !== id)
        })
    },
    removeSubTask: (id: string, parentId: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task, subTask: task.id === parentId ? [...task.subTask].filter(subTask => subTask.id !== id) as [] : [...task.subTask] as []
            }))
        })
    },
    createSubTask: (title, parentId, description) => {
        const { tasks } = get();
        const newSubTask = {
            id: generateSubId(),
            title,
            description,
            createdAt: Date.now()
        }
        set({
            tasks: tasks.map((task) => ({
                ...task, subTask: task.id === parentId ? [...task.subTask].concat(newSubTask) : [...task.subTask]
            }))
        })
    },
}))));