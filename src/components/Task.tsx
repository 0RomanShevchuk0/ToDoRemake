import { FC } from "react"
import { useSelector } from "react-redux"
import { useActions } from "../hooks/useActions"
import { RootStateType } from "../redux/store"
import styles from "../styles/Task.module.scss"
import { ITask } from "../types/ToDoListTypes"

interface TaskPropsType extends Omit<ITask, "id"> {
  listId: string
  taskId: string
}

const Task: FC<TaskPropsType> = ({
  listId,
  taskId,
  name,
  isDone,
}) => {
  const taskStartList = useSelector(
    (state: RootStateType) => state.DraggingState.taskStartList
  )
  const taskStart = useSelector(
    (state: RootStateType) => state.DraggingState.taskStart
  )
  const { toggleIsDone, deleteTask, moveTask, setTaskStartList, setTaskStart } =
    useActions()

  function handleTaskDragStart() {
    setTaskStartList(listId)
    setTaskStart(taskId)
  }
  function handleTaskDragEnter() {
    if (taskStartList && taskStart) {
      if (taskStartList !== listId) {
        setTaskStartList(listId)
      }
      moveTask({
        listStartId: taskStartList,
        taskStartId: taskStart,
        destination: { listId, taskId },
      })
    }
  }
  function clearDragStarts() {
    setTaskStartList(null)
    setTaskStart(null)
  }

  return (
    <div
      className={styles.task}
      draggable={true}
      onDragOver={(e) => e.preventDefault()}
      onDragStart={handleTaskDragStart}
      onDragEnter={handleTaskDragEnter}
      onDragEnd={clearDragStarts}
      onDrop={clearDragStarts}
    >
      <label>
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => toggleIsDone({ listId: listId, taskId: taskId })}
        />
        {name}
      </label>
      <button onClick={() => deleteTask({ listId: listId, taskId: taskId })}>
        x
      </button>
    </div>
  )
}

export default Task
