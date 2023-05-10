import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v1 } from "uuid"
import { ITask, IToDoList } from "../types/ToDoListTypes"

const initialState: IToDoList[] = [
  {
    id: v1(),
    title: "Products list",
    tasks: [
      {
        id: v1(),
        name: "Buy bread",
        isDone: false,
      },
      {
        id: v1(),
        name: "Buy milk",
        isDone: false,
      },
      {
        id: v1(),
        name: "Buy chips",
        isDone: true,
      },
    ],
  },
  {
    id: v1(),
    title: "Stack",
    tasks: [
      {
        id: v1(),
        name: "TypeScript",
        isDone: false,
      },
      {
        id: v1(),
        name: "React",
        isDone: false,
      },
      {
        id: v1(),
        name: "Redux",
        isDone: true,
      },
    ],
  }
]

export const ToDoLists = createSlice({
  name: "ToDoLists",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<{ name: string; listId: string }>) {
      const newTask: ITask = {
        id: v1(),
        name: action.payload.name,
        isDone: false,
      }
      const currentList = state.find((l) => l.id === action.payload.listId)
      currentList?.tasks.unshift(newTask)
    },
    deleteTask(state, action: PayloadAction<{ listId: string; taskId: string }>) {
      const currentList = state.find((l) => l.id === action.payload.listId)
      if (currentList) {
        currentList.tasks = currentList.tasks.filter(
          (t) => t.id !== action.payload.taskId
        )
      }
    },
    toggleIsDone(state, action: PayloadAction<{ listId: string; taskId: string }>) {
      const currentList = state.find((l) => l.id === action.payload.listId)
      const taskToChange = currentList?.tasks.find((t) => t.id === action.payload.taskId)
      if (taskToChange) {
        taskToChange.isDone = !taskToChange.isDone
      }
    },
  },
})

export const { addTask, deleteTask, toggleIsDone } = ToDoLists.actions

export default ToDoLists.reducer
