import { FC, MutableRefObject, useEffect, useState } from "react"
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
  listRef,
}) => {
  const { deleteList, changeListName } = useActions()

  const [changedName, setChangedName] = useState(name)
  const [isEditMode, setIsEditMode] = useState(false)

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

  function handleEdit() {
    setIsEditMode(true)
    setIsOptionsPopUpVisible(false)
  }
  function handleConfirmNameChange() {
    changeListName({ id, newName: changedName })
    setIsEditMode(false)
  }
  function handleCancelNameChange() {
    setChangedName(name)
    setIsEditMode(false)
  }
	
  return (
    <div className={styles.header}>
      {!isEditMode ? (
        <h3 className={styles.title}>{name}</h3>
      ) : (
        <>
          <input
            type="text"
            value={changedName}
            onChange={(e) => setChangedName(e.target.value)}
          />
          <button onClick={handleConfirmNameChange}>Confirm</button>
          <button onClick={handleCancelNameChange}>Cancel</button>
        </>
      )}
      <button
        className="button-without-background x-mark"
        onClick={() => setIsOptionsPopUpVisible(true)}
      >
        <SlOptions />
      </button>
      {isOptionsPopUpVisible && (
        <div className={styles.optionsPopUp}>
          <ul>
            <li onClick={handleEdit}>Edit</li>
            <li onClick={() => deleteList(id)}>Delete</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default ListHeader
