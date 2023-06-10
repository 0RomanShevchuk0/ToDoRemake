import { bindActionCreators } from "@reduxjs/toolkit"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { ToDoLists } from "../redux/TodoLists.slice"
import { DraggingState } from "../redux/DraggingState.slice"
import { EditingElements } from "../redux/EditingElements.slice"

const rootActions = {
  ...ToDoLists.actions,
	...DraggingState.actions,
	...EditingElements.actions,
}

export const useActions = () => {
  const dispatch = useDispatch()

  return useMemo(() => {
    return bindActionCreators(rootActions, dispatch)
  }, [dispatch])
}
