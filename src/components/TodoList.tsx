import { FC, MutableRefObject, useEffect, useRef, useState } from "react"
import { IToDoList, TasksFilterType } from "../types/ToDoListTypes"
import styles from "../styles/ToDoList.module.scss"
import Task from "./Task"
import Filter from "./TasksFilter"
import AddTask from "./AddTask"
import ListHeader from "./ListHeader"
import { useActions } from "../hooks/useActions"
import { useSelector } from "react-redux"
import { RootStateType } from "../redux/store"


const TodoList: FC<IToDoList> = ({ id, tasks, name }) => {
  const listStart = useSelector(
    (state: RootStateType) => state.DraggingState.listStart
  )
  const taskStartList = useSelector(
    (state: RootStateType) => state.DraggingState.taskStartList
  )
  const taskStart = useSelector(
    (state: RootStateType) => state.DraggingState.taskStart
  )

  const { moveList, setListStart, moveTask, setTaskStartList } = useActions()

  const listRef = useRef() as MutableRefObject<HTMLDivElement>
  const [isOptionsPopUpVisible, setIsOptionsPopUpVisible] = useState(false)

  const [filter, setFilter] = useState<TasksFilterType>("All")
  const filters: TasksFilterType[] = ["All", "Active", "Completed"]
  const filterElements = filters.map((f, i) => (
    <Filter key={i} f={f} filter={filter} setFilter={setFilter} />
  ))
  const filteredTasks = tasks.filter((t) => {
    switch (filter) {
      case "All":
        return true
      case "Active":
        return !t.isDone
      case "Completed":
        return t.isDone
    }
  })
  const taskItems = filteredTasks.map((t) => (
    <Task
      key={t.id}
      listId={id}
      taskId={t.id}
      name={t.name}
      isDone={t.isDone}
      listRef={listRef}
    />
  ))

  function handleListDragStart() {
    setListStart(id)
  }
  function handleListDragEnter() {
    if (listStart !== id && listStart) {
      moveList({ startId: listStart, destinationId: id })
    }
  }
  function handleListDragEnd() {
    setListStart(null)
  }

  function handleTaskDragEnter() {
    if (tasks.length === 0 && taskStartList && taskStart) {
      if (taskStartList !== id) {
        setTaskStartList(id)
      }
      moveTask({
        listStartId: taskStartList,
        taskStartId: taskStart,
        destination: { listId: id },
      })
    }
  }

  return (
    <section className={styles.toDoList} ref={listRef}>
      <div
        draggable={true}
        onDragOver={(e) => e.preventDefault()}
        onDragStart={handleListDragStart}
        onDragEnter={handleListDragEnter}
        onDragEnd={handleListDragEnd}
      >
        <ListHeader
          id={id}
          name={name}
          listRef={listRef}
          isOptionsPopUpVisible={isOptionsPopUpVisible}
          setIsOptionsPopUpVisible={setIsOptionsPopUpVisible}
        />
      </div>
      <div className={styles.filters}>{filterElements}</div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleTaskDragEnter}
        className={styles.tasks}
      >
        {taskItems}
      </div>
      <AddTask id={id} />
    </section>
  )
}

export default TodoList
