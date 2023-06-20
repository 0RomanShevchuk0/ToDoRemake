import { FC } from "react"
import { useSelector } from "react-redux"
import { useActions } from "../hooks/useActions"
import { RootStateType } from "../redux/store"
import styles from "../styles/Task.module.scss"
import { ITask } from "../types/ToDoListTypes"
import TaskEditField from "./TaskEditField"
import { MdModeEdit } from "react-icons/md"
import { BsFillTrash3Fill } from "react-icons/bs"
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io"

interface TaskPropsType extends Omit<ITask, "id"> {
  listId: string
  taskId: string
}

const Task: FC<TaskPropsType> = ({ listId, taskId, name, isDone }) => {
  const taskStartList = useSelector(
    (state: RootStateType) => state.DraggingState.taskStartList
  )
  const taskStart = useSelector(
    (state: RootStateType) => state.DraggingState.taskStart
  )
  const editingTask = useSelector(
    (state: RootStateType) => state.EditingElements.editingTask
  )
  const isMobileMovingMode = useSelector(
    (state: RootStateType) => state.DraggingState.isMobileMovingMode
  )

  const {
    toggleIsDone,
    deleteTask,
    moveTask,
    setTaskStartList,
    setTaskStart,
    setEditingTask,
    moveTaskMobile,
  } = useActions()

  function handleTaskDragStart() {
    setTaskStartList(listId)
    setTaskStart(taskId)
    setEditingTask(null)
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
    >
      <label style={{ display: "flex" }}>
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => toggleIsDone({ listId: listId, taskId: taskId })}
        />

        {editingTask !== taskId ? (
          name
        ) : (
          <TaskEditField name={name} listId={listId} taskId={taskId} />
        )}
      </label>

      {!isMobileMovingMode ? (
        <>
          {editingTask === taskId ? (
            <button onClick={() => deleteTask({ listId, taskId })}>
              <BsFillTrash3Fill />
            </button>
          ) : (
            <button onClick={() => setEditingTask(taskId)}>
              <MdModeEdit />
            </button>
          )}
        </>
      ) : (
        <div>
          <button
            onClick={() => moveTaskMobile({ listId, taskId, destination: "up" })}
          >
            <IoIosArrowUp />
          </button>
          <button
            onClick={() => moveTaskMobile({ listId, taskId, destination: "down" })}
          >
            <IoIosArrowDown />
          </button>
        </div>
      )}
    </div>
  )
}

export default Task
