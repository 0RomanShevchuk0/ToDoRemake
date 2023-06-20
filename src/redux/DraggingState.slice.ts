import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialStateType = {
  listStart: string | null
  taskStartList: string | null
  taskStart: string | null
  isMobileMovingMode: boolean
}

const initialState: InitialStateType = {
  listStart: null,
  taskStartList: null,
  taskStart: null,
  isMobileMovingMode: false,
}

export const DraggingState = createSlice({
  name: "DraggingState",
  initialState,
  reducers: {
    setListStart(state, action: PayloadAction<string | null>) {
      state.listStart = action.payload
    },
    setTaskStartList(state, action: PayloadAction<string | null>) {
      state.taskStartList = action.payload
    },
    setTaskStart(state, action: PayloadAction<string | null>) {
      state.taskStart = action.payload
    },
    setIsMobileMovingMode(state, action: PayloadAction<boolean>) {
      state.isMobileMovingMode = action.payload
    },
  },
})

export const {
  setListStart,
  setTaskStartList,
  setTaskStart,
  setIsMobileMovingMode,
} = DraggingState.actions

export default DraggingState.reducer
