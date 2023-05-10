import { FC } from "react"
import { useActions } from "../hooks/useActions"
import { ITask } from "../types/ToDoListTypes"

interface TaskPropsType extends Omit<ITask, "id"> {
  listId: string
  taskId: string
}

const Task: FC<TaskPropsType> = ({ listId, taskId, name, isDone }) => {
  const { toggleIsDone, deleteTask } = useActions()

  return (
    <div key={taskId}>
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
