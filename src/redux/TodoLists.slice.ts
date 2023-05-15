import { createSlice, createStore, PayloadAction } from "@reduxjs/toolkit"
import { v1 } from "uuid"
import { ITask, IToDoList } from "../types/ToDoListTypes"

type InitialStateType = {
  lists: IToDoList[]
}

const initialState: InitialStateType = {
  lists: [
    {
      id: v1(),
      name: "Products list",
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
      name: "Stack",
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
    addList(state, action: PayloadAction<string>) {
      const newList: IToDoList = {
        id: v1(),
        name: action.payload,
        tasks: [],
      }
      state.lists.push(newList)
    },
    deleteList(state, action: PayloadAction<string>) {
      state.lists = state.lists.filter((l) => l.id !== action.payload)
    },
    changeTitle(state, action: PayloadAction<{ id: string; newName: string }>) {
      const currentList = state.lists.find((l) => l.id === action.payload.id)
      if (currentList) {
        currentList.name = action.payload.newName
      }
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

    //* Moving
    moveList(state, action: PayloadAction<{ id: string; destinationId: string }>) {
      const currentList = state.lists.find((l) => l.id === action.payload.id)
      const destinationList = state.lists.find(
        (l) => l.id === action.payload.destinationId
      )
			
      if (currentList && destinationList) {
        const destination = state.lists.indexOf(destinationList)

        state.lists = state.lists.filter((l) => l.id !== action.payload.id)
        state.lists.splice(destination, 0, currentList)
      }
    },
    moveTask(
      state,
      action: PayloadAction<{
        listId: string
        taskId: string
        destination: { listId: string; taskId: string }
      }>
    ) {
      const currentList = state.lists.find((l) => l.id === action.payload.listId)
      const currentTask = currentList?.tasks.find(
        (t) => t.id === action.payload.taskId
      )
      const destinationList = state.lists.find(
        (l) => l.id === action.payload.destination.listId
      )
      const destinationTask = destinationList?.tasks.find(
        (t) => t.id === action.payload.destination.taskId
      )
      if (currentList && destinationTask && currentTask) {
        const destination = destinationList?.tasks.indexOf(destinationTask)

        currentList.tasks = currentList?.tasks.filter(
          (t) => t.id !== action.payload.taskId
        )

        if (destination !== undefined) {
          destinationList?.tasks.splice(destination, 0, currentTask)
        }
      }
    },
  },
})

export const {
  addList,
  deleteList,
  changeTitle,
  addTask,
  deleteTask,
  toggleIsDone,
  moveTask,
  moveList,
} = ToDoLists.actions

export default ToDoLists.reducer