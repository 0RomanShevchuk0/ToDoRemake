import { ChangeEvent, FC, KeyboardEvent, useState } from "react"
import { useActions } from "../hooks/useActions"
import Task from "./task"
import styles from "../styles/ToDoList.module.scss"
import Filter from "./Filter"
import { IToDoList } from "../types/ToDoListTypes"

export type FilterType = "All" | "Active" | "Completed"


const TodoList: FC<IToDoList> = ({id, tasks, title}) => {
  const { addTask } = useActions()

  const [taskName, setTaskName] = useState("")
  const [error, setError] = useState<null | string>(null)
  const [filter, setFilter] = useState<FilterType>("All")

  const filters: FilterType[] = ["All", "Active", "Completed"]
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
      addTask({name: taskName.trim(), listId: id})
      setTaskName("")
    } else {
      setError("Title can't be empty")
      setTaskName("")
    }
  }
  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setError(null)
    setTaskName(e.target.value)
  }
	function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
		if(e.code === 'Enter') {
			handleAddTask()
		}
	}

  return (
    <section className={styles.toDoList}>
      <h3 className={styles.title}>{title}</h3>
      <>
        <input
          className={error ? styles.inputError : ""}
          type="text"
          value={taskName}
          onChange={handleTitleChange}
					onKeyDown={handleKeyPress}
        />
        <button onClick={handleAddTask}>+</button>
      </>
      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.tasks}>{taskItems}</div>
      <div className={styles.filters}>{filterElements}</div>
    </section>
  )
}

export default TodoList
