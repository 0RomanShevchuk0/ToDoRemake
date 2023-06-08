import { DragEvent, FC } from "react"
import { useSelector } from "react-redux"
import { useActions } from "../hooks/useActions"
import { RootStateType } from "../redux/store"
import styles from "../styles/Task.module.scss"
import { ITask } from "../types/ToDoListTypes"

interface TaskPropsType extends Omit<ITask, "id"> {
  listId: string
  taskId: string
}

const Task: FC<TaskPropsType> = ({ listId, taskId, name, isDone }) => {
  const listStart = useSelector(
    (state: RootStateType) => state.DraggingState.listStart
  )
  const taskStart = useSelector(
    (state: RootStateType) => state.DraggingState.taskStart
  )
  const { toggleIsDone, deleteTask, moveTask, setListStart, setTaskStart } =
    useActions()

  function handleTaskDragStart() {
		setListStart(listId)
    setTaskStart(taskId)
  }
  function handleTaskDragEnter() {
    if (listStart && taskStart) {
      moveTask({
        listStartId: listStart,
        taskStartId: taskStart,
        destination: { listId, taskId },
      })
    }
  }
  function handleTaskDragEnd() {
		debugger
		setListStart(null)
    setTaskStart(null)
  }

  return (
    <div
      key={taskId}
      className={styles.task}
      // onDrag={(e) => console.log(e.target.closest(`.${styles.task}`))}
      // draggable={true}
      // onDragStart={handleDragStart}
      // onDragOver={(e) => e.preventDefault()}
      // onDrop={handleTaskDrop}

      draggable={true}
      onDragOver={(e) => e.preventDefault()}
      onDragStart={handleTaskDragStart}
      onDragEnter={handleTaskDragEnter}
      onDragEnd={handleTaskDragEnd}
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
