import { DragEvent, FC } from "react"
import { useActions } from "../hooks/useActions"
import { ITask } from "../types/ToDoListTypes"
import styles from "../styles/Task.module.scss"

interface TaskPropsType extends Omit<ITask, "id"> {
  listId: string
  taskId: string
}

const Task: FC<TaskPropsType> = ({ listId, taskId, name, isDone }) => {
  const { toggleIsDone, deleteTask, moveTask } = useActions()

  function handleDragStart(e: DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData("movingTask", JSON.stringify({ listId, taskId }))
  }
  function handleDrop(e: DragEvent<HTMLDivElement>) {
    type DataType = {
      listId: string
      taskId: string
    }
    const data: DataType = JSON.parse(e.dataTransfer.getData("movingTask"))
    moveTask({
      listId: data.listId,
      taskId: data.taskId,
      destination: { listId, taskId },
    })
  }

  return (
    <div
      key={taskId}
      className={styles.task}
      draggable={true}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
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
