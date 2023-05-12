import { FC } from "react"
import { useActions } from "../hooks/useActions"
import styles from "../styles/ToDoList.module.scss"

type ListHeaderPropType = {
  name: string
  id: string
}

const ListHeader: FC<ListHeaderPropType> = ({ name, id }) => {
  const { deleteList } = useActions()

  function handleDeleteList() {
    deleteList(id)
  }

  return (
    <div className={styles.header}>
      <h3 className={styles.title}>{name}</h3>
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
