import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialStateType = {
  listStart: string | null
}

const initialState: InitialStateType = {
  listStart: null,
}

export const DraggingState = createSlice({
  name: "DraggingState",
  initialState,
  reducers: {
    setListStart(state, action: PayloadAction<string | null>) {
      state.listStart = action.payload
    },
  },
})

export const { setListStart } = DraggingState.actions

export default DraggingState.reducer
