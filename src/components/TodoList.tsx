import { FC, useState } from "react"
import { IToDoList } from "../types/ToDoListTypes"
import styles from "../styles/ToDoList.module.scss"
import Task from "./task"
import Filter from "./TasksFilter"
import AddTask from "./AddTask"
import ListHeader from "./ListHeader"

export type TasksFilterType = "All" | "Active" | "Completed"

const TodoList: FC<IToDoList> = ({ id, tasks, name }) => {
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
    <Task key={t.id} listId={id} taskId={t.id} name={t.name} isDone={t.isDone} />
  ))

  return (
    <section className={styles.toDoList}>
      <ListHeader id={id} name={name} />

      <div className={styles.filters}>{filterElements}</div>
      <div className={styles.tasks}>{taskItems}</div>

      <AddTask id={id} />
    </section>
  )
}

export default TodoList
