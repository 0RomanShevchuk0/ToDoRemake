import { FC, useState } from "react"
import { useSelector } from "react-redux"
import { RootStateType } from "./redux/store"
import { IToDoList } from "./types/ToDoListTypes"
import styles from "./styles/app.module.scss"
import TodoList from "./components/TodoList"
import Header from "./components/Header"
import classNames from "classnames"

const App: FC = () => {
  const toDoLists = useSelector((state: RootStateType) => state.ToDoLists)
  const toDoListElements = toDoLists.lists.map((l: IToDoList) => (
    <TodoList key={l.id} id={l.id} tasks={l.tasks} title={l.title} />
  ))

  const [isGrid, setIsGrid] = useState<boolean>(false)

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
          <div>
            <input type="text" />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
