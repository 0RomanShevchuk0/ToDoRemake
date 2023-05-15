import { FC, LegacyRef, RefObject, useEffect, useRef, useState } from "react"
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
  const headerRef = useRef<any>()

  useEffect(() => {
    if (isOptionsPopUpVisible) {
      headerRef.current.addEventListener("click", () =>
        setIsOptionsPopUpVisible(false)
      )
    }
  }, [isOptionsPopUpVisible])

  return (
    <div className={styles.header} ref={headerRef}>
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
          </ul>
        </div>
      )}
    </div>
  )
}

export default ListHeader
