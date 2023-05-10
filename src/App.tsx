import { FC } from "react"
import { useSelector } from "react-redux"
import TodoList from "./components/TodoList"
import { RootStateType } from "./redux/store"
import styles from "./styles/app.module.scss"
import { IToDoList } from "./types/ToDoListTypes"

const App: FC = () => {
  const toDoLists = useSelector((state: RootStateType) => 
		state.ToDoLists
	)
	const toDoListElements = toDoLists.map((l: IToDoList) => 
		<TodoList key={l.id} id={l.id} tasks={l.tasks} title={l.title} />
	)

  return (
    <div className={styles.app}>
      App
      <div className={styles.toDos}>
        {toDoListElements}
      </div>
    </div>
  )
}

export default App
