import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v1 } from "uuid"
import { ITask, IToDoList } from "../types/ToDoListTypes"

type InitialStateType = {
	lists: IToDoList[]
}

const initialState: InitialStateType = {
  lists: [
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
          isDone: true,
        },
        {
          id: v1(),
          name: "React",
          isDone: true,
        },
        {
          id: v1(),
          name: "Redux",
          isDone: true,
        },
        {
          id: v1(),
          name: "Next.js",
          isDone: false,
        },
        {
          id: v1(),
          name: "React Query",
          isDone: false,
        },
      ],
    },
  ],
}

export const ToDoLists = createSlice({
  name: "ToDoLists",
  initialState,
  reducers: {
    //* Lists
    deleteList(state, action: PayloadAction<string>) {
      state.lists = state.lists.filter((l) => l.id !== action.payload)
    },

    //* Tasks

    addTask(state, action: PayloadAction<{ name: string; listId: string }>) {
      const newTask: ITask = {
        id: v1(),
        name: action.payload.name,
        isDone: false,
      }
      const currentList = state.lists.find((l) => l.id === action.payload.listId)
      currentList?.tasks.push(newTask)
    },
    deleteTask(state, action: PayloadAction<{ listId: string; taskId: string }>) {
      const currentList = state.lists.find((l) => l.id === action.payload.listId)
      if (currentList) {
        currentList.tasks = currentList.tasks.filter(
          (t) => t.id !== action.payload.taskId
        )
      }
    },
    toggleIsDone(state, action: PayloadAction<{ listId: string; taskId: string }>) {
      const currentList = state.lists.find((l) => l.id === action.payload.listId)
      const taskToChange = currentList?.tasks.find(
        (t) => t.id === action.payload.taskId
      )
      if (taskToChange) {
        taskToChange.isDone = !taskToChange.isDone
      }
    },
  },
})

export const { deleteList, addTask, deleteTask, toggleIsDone } = ToDoLists.actions

export default ToDoLists.reducer
