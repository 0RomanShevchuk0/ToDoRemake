import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ToDoLists from './TodoLists.slice';

const rootReducer = combineReducers({
	ToDoLists: ToDoLists
})

export type RootStateType = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: rootReducer
})