import { combineReducers, configureStore } from "@reduxjs/toolkit"
import ToDoLists from "./TodoLists.slice"
import DraggingState from "./DraggingState.slice"
import EditingElements from "./EditingElements.slice"

const rootReducer = combineReducers({
  ToDoLists,
  DraggingState,
	EditingElements
})

export type RootStateType = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: rootReducer,
})
