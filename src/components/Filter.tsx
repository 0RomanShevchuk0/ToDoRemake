import { FC } from "react"
import classNames from "classnames"
import { FilterType } from "./TodoList"
import styles from "../styles/ToDoList.module.scss"

type FilterPropsType = {
  f: FilterType
  filter: FilterType
  setFilter: (filter: FilterType) => void
}

const Filter: FC<FilterPropsType> = ({ f, filter, setFilter }) => {
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

export default Filter
