import { FC, useState } from "react"
import styles from "../styles/Task.module.scss"
import onKeyDownEvents from "../utils/onKeyDownEvents"
import { useActions } from "../hooks/useActions"
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs"

type PropsType = {
  name: string
  listId: string
  taskId: string
}

const TaskEditField: FC<PropsType> = ({ name, listId, taskId }) => {
  const { setEditingTask, changeTaskName } = useActions()
  const [newTaskName, setNewTaskName] = useState(name)

  function handleChangeTaskName() {
    if (newTaskName.trim() !== "") {
      changeTaskName({ listId, taskId, newName: newTaskName })
    }
    setEditingTask(null)
  }
  function handleCancelNameChange() {
    setNewTaskName(name)
    setEditingTask(null)
  }
  const handleKeyDown = onKeyDownEvents(handleChangeTaskName, handleCancelNameChange)

  return (
    <div className={styles.editField}>
      <input
        type="text"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <div className={styles.buttons}>
        <button onClick={handleChangeTaskName}>
          <BsFillCheckCircleFill />
        </button>
        <button onClick={handleCancelNameChange}>
          <BsFillXCircleFill />
        </button>
      </div>
    </div>
  )
}

export default TaskEditField
