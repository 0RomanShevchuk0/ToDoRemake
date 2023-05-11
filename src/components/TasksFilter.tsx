import { FC } from "react"
import classNames from "classnames"
import { TasksFilterType } from "./TodoList"
import styles from "../styles/ToDoList.module.scss"

type TasksFilterPropsType = {
  f: TasksFilterType
  filter: TasksFilterType
  setFilter: (filter: TasksFilterType) => void
}

const TasksFilter: FC<TasksFilterPropsType> = ({ f, filter, setFilter }) => {
  return (
    <span
      onClick={() => setFilter(f)}
      className={
        filter === f ? classNames(styles.filter, styles.active) : styles.filter
      }
    >
      {f}
    </span>
  )
}

export default TasksFilter
