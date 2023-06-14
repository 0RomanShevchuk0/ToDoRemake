import { ChangeEvent, FC, useState } from "react"
import classNames from "classnames"
import styles from "../styles/ToDoList.module.scss"
import { useActions } from "../hooks/useActions"
import onKeyDownActions from "../utils/onKeyDownEvents"
import { HiOutlineX } from "react-icons/hi"

const AddTask: FC<{ id: string }> = ({ id }) => {
  const { addTask } = useActions()
  const [taskName, setTaskName] = useState("")
  const [error, setError] = useState<null | string>(null)
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false)

  function handleAddTask() {
    if (taskName.trim() !== "") {
      addTask({ name: taskName.trim(), listId: id })
      setTaskName("")
    } else {
      setError("Title can't be empty")
      setTaskName("")
    }
  }
  function handleCancel() {
    setTaskName("")
    setIsAddTaskVisible(false)
  }
  function handleNameChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setError(null)
    setTaskName(e.target.value)
  }
  const handleKeyDown = onKeyDownActions(handleAddTask, handleCancel)

  return (
    <>
      {isAddTaskVisible ? (
        <>
          <textarea
            className={
              error
                ? classNames(styles.taskTextArea, styles.error)
                : styles.taskTextArea
            }
            value={taskName}
            onChange={handleNameChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter a title for this task"
						autoFocus
          />
          {error && <div className={styles.errorMessage}>{error}</div>}
          <div className={styles.buttons}>
            <button onClick={handleAddTask}>Add task</button>
            <button
              onClick={handleCancel}
              className="button-without-background x-mark"
            >
              <HiOutlineX />
            </button>
          </div>
        </>
      ) : (
        <div
          className="button-without-background"
          onClick={() => setIsAddTaskVisible(true)}
        >
          +Add task...
        </div>
      )}
    </>
  )
}

export default AddTask
