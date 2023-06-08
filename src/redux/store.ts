import { combineReducers, configureStore } from "@reduxjs/toolkit"
import ToDoLists from "./TodoLists.slice"
import DraggingState from "./DraggingState.slice"

const rootReducer = combineReducers({
  ToDoLists,
  DraggingState,
})

export type RootStateType = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: rootReducer,
})
