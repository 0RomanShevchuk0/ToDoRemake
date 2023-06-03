import { FC, MutableRefObject, useEffect } from "react"
import { useActions } from "../hooks/useActions"
import styles from "../styles/ToDoList.module.scss"
import { SlOptions } from "react-icons/sl"

type ListHeaderPropType = {
  name: string
  id: string
	listRef: MutableRefObject<HTMLDivElement>
  isOptionsPopUpVisible: boolean
  setIsOptionsPopUpVisible: (isVisible: boolean) => void
}

const ListHeader: FC<ListHeaderPropType> = ({
  name,
  id,
  isOptionsPopUpVisible,
  setIsOptionsPopUpVisible,
	listRef
}) => {
  const { deleteList } = useActions()

	useEffect(() => {
    function hideDelete(e: any) {
      if (isOptionsPopUpVisible && e.target.tagName !== "LI") {
        setIsOptionsPopUpVisible(false)
      }
    }
    listRef.current.addEventListener("click", hideDelete)

    return () =>
      listRef.current && listRef.current.removeEventListener("click", hideDelete)
  }, [isOptionsPopUpVisible])

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
          </ul>
        </div>
      )}
    </div>
  )
}

export default ListHeader
