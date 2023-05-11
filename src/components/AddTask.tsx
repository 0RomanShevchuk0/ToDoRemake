import { ChangeEvent, FC, KeyboardEvent } from "react"
import classNames from "classnames"
import styles from "../styles/ToDoList.module.scss"

type AddTaskPropsType = {
  isAddTaskVisible: boolean
  error: string | null
  taskName: string
  handleNameChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  handleKeyPress: (e: KeyboardEvent<HTMLTextAreaElement>) => void
  handleAddTask: () => void
  setIsAddTaskVisible: (isVisible: boolean) => void
}

const AddTask: FC<AddTaskPropsType> = ({
  isAddTaskVisible,
  error,
  taskName,
  handleNameChange,
  handleKeyPress,
  handleAddTask,
  setIsAddTaskVisible,
}) => {
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
            onKeyDown={handleKeyPress}
            placeholder="Enter a title for this task"
          />
          {error && <div className={styles.errorMessage}>{error}</div>}
          <button onClick={handleAddTask}>Add task</button>
          <button
            onClick={() => setIsAddTaskVisible(false)}
            className="button-without-background x-mark"
          >
            x
          </button>
        </>
      ) : (
        <button
          className="button-without-background"
          onClick={() => setIsAddTaskVisible(true)}
        >
          +Add task...
        </button>
      )}
    </>
  )
}

export default AddTask
