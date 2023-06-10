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
    {
      id: v1(),
      name: "Grocery list",
      tasks: [
        {
          id: v1(),
          name: "Buy eggs",
          isDone: false,
        },
        {
          id: v1(),
          name: "Buy vegetables",
          isDone: false,
        },
        {
          id: v1(),
          name: "Buy pasta",
          isDone: true,
        },
      ],
    },
    {
      id: v1(),
      name: "Household chores",
      tasks: [
        {
          id: v1(),
          name: "Clean the kitchen",
          isDone: false,
        },
        {
          id: v1(),
          name: "Do laundry",
          isDone: false,
        },
        {
          id: v1(),
          name: "Mow the lawn",
          isDone: true,
        },
      ],
    },
    {
      id: v1(),
      name: "Work tasks",
      tasks: [
        {
          id: v1(),
          name: "Prepare presentation",
          isDone: false,
        },
        {
          id: v1(),
          name: "Reply to emails",
          isDone: false,
        },
        {
          id: v1(),
          name: "Submit reports",
          isDone: true,
        },
      ],
    },
  ]
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
    changeListName(state, action: PayloadAction<{ id: string; newName: string }>) {
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
		changeTaskName(state, action: PayloadAction<{ listId: string; taskId: string; newName: string }>) {
      const currentList = state.lists.find((l) => l.id === action.payload.listId)
      const currentTask = currentList?.tasks?.find((t) => t.id === action.payload.taskId)
      if (currentTask) {
        currentTask.name = action.payload.newName
      }
    },

    //* Moving
    moveList(
      state,
      action: PayloadAction<{ startId: string; destinationId: string }>
    ) {
      const startList = state.lists.find((l) => l.id === action.payload.startId)
      const destinationList = state.lists.find(
        (l) => l.id === action.payload.destinationId
      )
      if (startList && destinationList && startList.id !== destinationList.id) {
        const destination = state.lists.indexOf(destinationList)

        state.lists = state.lists.filter((l) => l.id !== action.payload.startId)
        state.lists.splice(destination, 0, startList)
      }
    },
    moveTask(
      state,
      action: PayloadAction<{
        listStartId: string
        taskStartId: string
        destination: { listId: string; taskId?: string }
      }>
    ) {
      const startList = state.lists.find((l) => l.id === action.payload.listStartId)
      const destinationList = state.lists.find(
        (l) => l.id === action.payload.destination.listId
      )
      const startTask = startList?.tasks.find(
        (t) => t.id === action.payload.taskStartId
      )
      const destinationTask = destinationList?.tasks.find(
        (t) => t.id === action.payload.destination.taskId
      )

      // if list is empty
      if (destinationList?.tasks.length === 0 && startTask && startList) {
        startList.tasks = startList?.tasks.filter(
          (t) => t.id !== action.payload.taskStartId
        )
        destinationList.tasks.push(startTask)
        return
      }

      // if list is not empty
      if (startList && destinationTask && startTask) {
        const destination = destinationList?.tasks.indexOf(destinationTask)

        startList.tasks = startList?.tasks.filter(
          (t) => t.id !== action.payload.taskStartId
        )
        if (destination !== undefined) {
          destinationList?.tasks.splice(destination, 0, startTask)
        }
      }
    },
  },
})

export const {
  addList,
  deleteList,
  changeListName,
  addTask,
  deleteTask,
	changeTaskName,
  toggleIsDone,
  moveTask,
  moveList,
} = ToDoLists.actions

export default ToDoLists.reducer
