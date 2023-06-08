import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialStateType = {
  listStart: string | null
  taskStart: string | null
}

const initialState: InitialStateType = {
  listStart: null,
  taskStart: null,
}

export const DraggingState = createSlice({
  name: "DraggingState",
  initialState,
  reducers: {
    setListStart(state, action: PayloadAction<string | null>) {
      state.listStart = action.payload
    },
    setTaskStart(state, action: PayloadAction<string | null>) {
      state.taskStart = action.payload
    },
  },
})

export const { setListStart, setTaskStart } = DraggingState.actions

export default DraggingState.reducer
