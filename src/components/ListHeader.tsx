import { FC } from "react"
import { useActions } from "../hooks/useActions"
import styles from "../styles/ToDoList.module.scss"

type ListHeaderPropType = {
  title: string
  id: string
}

const ListHeader: FC<ListHeaderPropType> = ({ title, id }) => {
  const { deleteList } = useActions()

  function handleDeleteList() {
    deleteList(id)
  }

  return (
    <div className={styles.header}>
      <h3 className={styles.title}>{title}</h3>
      <button
        className="button-without-background x-mark"
        onClick={handleDeleteList}
      >
        x
      </button>
    </div>
  )
}

export default ListHeader
