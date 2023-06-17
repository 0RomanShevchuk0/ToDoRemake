import { FC, MutableRefObject, TouchEvent, useEffect, useRef, useState } from "react"
import { IToDoList, TasksFilterType } from "../types/ToDoListTypes"
import styles from "../styles/ToDoList.module.scss"
import Task from "./Task"
import Filter from "./TasksFilter"
import AddTask from "./AddTask"
import ListHeader from "./ListHeader"
import { useActions } from "../hooks/useActions"
import { useSelector } from "react-redux"
import { RootStateType } from "../redux/store"

const TodoList: FC<IToDoList> = ({ id, tasks, name, location }) => {
  const lists = useSelector((state: RootStateType) => state.ToDoLists.lists)
  const listStart = useSelector(
    (state: RootStateType) => state.DraggingState.listStart
  )
  const taskStartList = useSelector(
    (state: RootStateType) => state.DraggingState.taskStartList
  )
  const taskStart = useSelector(
    (state: RootStateType) => state.DraggingState.taskStart
  )

  const { moveList, setListStart, moveTask, setTaskStartList, setListLocation } =
    useActions()

  const listRef = useRef() as MutableRefObject<HTMLDivElement>
  const listHeaderRef = useRef() as MutableRefObject<HTMLDivElement>
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
	console.log('render')
  const [isLocationReset, resetLocation] = useState(false)
  useEffect(() => {
    const listLocation = listRef.current.getBoundingClientRect()
    setListLocation({
      listId: id,
      location: {
        x: listLocation.x,
        y: listLocation.y,
        destination: { x: null, y: null },
      },
    })
  }, [isLocationReset])

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

  function handleTouchMove(e: TouchEvent<HTMLDivElement>) {
    listRef.current.style.position = "relative"
    listRef.current.style.zIndex = `${100}`
    setListLocation({
      listId: id,
      location: {
        ...location,
        destination: { x: e.touches[0].clientX, y: e.touches[0].clientY },
      },
    })
    if (location.destination.x && location.destination.y) {
      listRef.current.style.top = `${location.destination.y - 80}px`
      listRef.current.style.left = `${
        location.destination.x - listRef.current.clientWidth / 2
      }px`
    }

    let destinationList = id
    lists.forEach((l) => {
      if (location.destination.x && location.destination.y && id !== l.id) {
        if (
          location.destination.x >
          l.location.x + listRef.current.clientWidth / 2
        ) {
          destinationList = l.id
          moveList({ startId: id, destinationId: destinationList })
          setListLocation({
            listId: l.id,
            location: { x: location.x, y: location.y },
          })
          resetLocation(!isLocationReset)
          listRef.current.style.position = "static"
        }
      }
    })
  }

  return (
    <section className={styles.toDoList} ref={listRef}>
      <div
        draggable={true}
        onDragOver={(e) => e.preventDefault()}
        onDragStart={handleListDragStart}
        onDragEnter={handleListDragEnter}
        onDragEnd={handleListDragEnd}
        ref={listHeaderRef}
        style={{ cursor: "grab" }}
        onTouchMove={handleTouchMove}
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
