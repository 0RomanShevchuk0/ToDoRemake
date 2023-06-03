import { FC, MutableRefObject, useEffect, useRef, useState } from "react"
import { useActions } from "../hooks/useActions"
import styles from "../styles/ToDoList.module.scss"
import { SlOptions } from "react-icons/sl"

type ListHeaderPropType = {
  name: string
  id: string
  isOptionsPopUpVisible: boolean
  setIsOptionsPopUpVisible: (isVisible: boolean) => void
}

const ListHeader: FC<ListHeaderPropType> = ({
  name,
  id,
  isOptionsPopUpVisible,
  setIsOptionsPopUpVisible,
}) => {
  const { deleteList } = useActions()

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
            <li onClick={() => deleteList(id)}>Delete list</li>
            <li onClick={() => deleteList(id)}>Delete list</li>
            <li onClick={() => deleteList(id)}>Delete list</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default ListHeader
