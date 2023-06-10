import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialStateType = {
  editingList: string | null
  editingTask: string | null
}

const initialState: InitialStateType = {
  editingList: null,
  editingTask: null,
}

export const EditingElements = createSlice({
  name: "EditingElements",
  initialState,
  reducers: {
    setEditingList(state, action: PayloadAction<string | null>) {
      state.editingList = action.payload
    },
    setEditingTask(state, action: PayloadAction<string | null>) {
      state.editingTask = action.payload
    },
  },
})

export const { setEditingList, setEditingTask } =
  EditingElements.actions

export default EditingElements.reducer
