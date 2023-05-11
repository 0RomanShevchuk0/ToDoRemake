import { ChangeEvent, FC, KeyboardEvent, useState } from "react"
import { useActions } from "../hooks/useActions"
import { IToDoList } from "../types/ToDoListTypes"
import styles from "../styles/ToDoList.module.scss"
import Task from "./task"
import Filter from "./TasksFilter"
import AddTask from "./AddTask"
import ListHeader from "./ListHeader"

export type TasksFilterType = "All" | "Active" | "Completed"

const TodoList: FC<IToDoList> = ({ id, tasks, title }) => {
  const { addTask } = useActions()

  const [taskName, setTaskName] = useState("")
  const [error, setError] = useState<null | string>(null)
  const [filter, setFilter] = useState<TasksFilterType>("All")
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false)

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
    <Task key={t.id} listId={id} taskId={t.id} name={t.name} isDone={t.isDone} />
  ))

  function handleAddTask() {
    if (taskName.trim() !== "") {
      addTask({ name: taskName.trim(), listId: id })
      setTaskName("")
    } else {
      setError("Title can't be empty")
      setTaskName("")
    }
  }
  function handleNameChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setError(null)
    setTaskName(e.target.value)
	}
  function handleKeyPress(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.code === "Enter") {
      handleAddTask()
    } else if (e.code === "Escape") {
      setIsAddTaskVisible(false)
    }
  }

  return (
    <section className={styles.toDoList}>
      <ListHeader id={id} title={title} />

      <div className={styles.filters}>{filterElements}</div>
      <div className={styles.tasks}>{taskItems}</div>

      <AddTask
        error={error}
        isAddTaskVisible={isAddTaskVisible}
        setIsAddTaskVisible={setIsAddTaskVisible}
        taskName={taskName}
        handleNameChange={handleNameChange}
        handleAddTask={handleAddTask}
        handleKeyPress={handleKeyPress}
      />
    </section>
  )
}

export default TodoList
