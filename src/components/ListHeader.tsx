import { FC, useState } from "react"
import { useActions } from "../hooks/useActions"
import styles from "../styles/ToDoList.module.scss"
import { SlOptions } from "react-icons/sl"

type ListHeaderPropType = {
  name: string
  id: string
}

const ListHeader: FC<ListHeaderPropType> = ({ name, id }) => {
  const { deleteList } = useActions()

  const [isOptionsPopUpVisible, setIsOptionsPopUpVisible] = useState(false)

  function handleDeleteList() {
    deleteList(id)
  }

  return (
    <div className={styles.header}>
      <h3 className={styles.title}>{name}</h3>
      <button
        className="button-without-background x-mark"
        onClick={() => setIsOptionsPopUpVisible(true)}
      >
        <SlOptions />
      </button>
      {isOptionsPopUpVisible && (
        <div className={styles.optionsPopUp}>
          <ul>
            <li onClick={handleDeleteList}>Delete list</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default ListHeader
