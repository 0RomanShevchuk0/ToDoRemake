import { FC, useState } from "react"
import { useSelector } from "react-redux"
import { RootStateType } from "./redux/store"
import { IToDoList } from "./types/ToDoListTypes"
import styles from "./styles/app.module.scss"
import TodoList from "./components/TodoList"
import Header from "./components/Header"
import classNames from "classnames"
import AddList from "./components/AddList"

const App: FC = () => {
  const toDoLists = useSelector((state: RootStateType) => state.ToDoLists)
  const toDoListElements = toDoLists.lists.map((l: IToDoList) => (
    <TodoList key={l.id} id={l.id} tasks={l.tasks} name={l.name} />
  ))

  const [isGrid, setIsGrid] = useState<boolean>(
    localStorage.getItem("view") === "flex" ? false : true
  )

  return (
    <div className={styles.app}>
      <Header isGrid={isGrid} setIsGrid={setIsGrid} />
      <main className={styles.main}>
        <div
          className={
            isGrid
              ? classNames(styles.toDos, styles.grid)
              : classNames(styles.toDos, styles.row)
          }
        >
          {toDoListElements}
          <AddList />
        </div>
      </main>
    </div>
  )
}

export default App
