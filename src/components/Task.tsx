import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useActions } from "../hooks/useActions"
import { RootStateType } from "../redux/store"
import styles from "../styles/Task.module.scss"
import { ITask } from "../types/ToDoListTypes"
import { BsFillTrash3Fill } from "react-icons/bs"
import { MdModeEdit } from "react-icons/md"
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs"
import onKeyDownEvents from "../utils/onKeyDownEvents"

interface TaskPropsType extends Omit<ITask, "id"> {
  listId: string
  taskId: string
  listRef: any
}

const Task: FC<TaskPropsType> = ({ listId, taskId, name, isDone, listRef }) => {
  const taskStartList = useSelector(
    (state: RootStateType) => state.DraggingState.taskStartList
  )
  const taskStart = useSelector(
    (state: RootStateType) => state.DraggingState.taskStart
  )

  const editingTask = useSelector(
    (state: RootStateType) => state.EditingElements.editingTask
  )

  const {
    toggleIsDone,
    deleteTask,
    moveTask,
    setTaskStartList,
    setTaskStart,
    setEditingTask,
    changeTaskName,
  } = useActions()

  const [newTaskName, setNewTaskName] = useState(name)

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

  // useEffect(() => {
  //   function hideManage(e: any) {
  //     // if (
  //     //   editingTask === taskId
  //     //   // e.target.closest("button") === "task-manage-button"
  //     // ) {
  //     //   setEditingTask(null)
  //     // }
  //   }
  //   listRef.current.addEventListener("click", hideManage)

  //   return () =>
  //     listRef.current && listRef.current.removeEventListener("click", hideManage)
  // }, [editingTask])

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
      <label style={{display: 'flex'}}>
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => toggleIsDone({ listId: listId, taskId: taskId })}
        />

        {editingTask !== taskId ? (
          name
        ) : (
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
        )}
      </label>
      {editingTask === taskId ? (
        <button onClick={() => deleteTask({ listId, taskId })}>
          <BsFillTrash3Fill />
        </button>
      ) : (
        <button onClick={() => setEditingTask(taskId)}>
          <MdModeEdit />
        </button>
      )}
    </div>
  )
}

export default Task
