import { FC, MutableRefObject, useEffect, useState } from "react"
import { useActions } from "../hooks/useActions"
import styles from "../styles/ToDoList.module.scss"
import { SlOptions } from "react-icons/sl"
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs"
import onKeyDownEvents from "../utils/onKeyDownEvents"
import { useSelector } from "react-redux"
import { RootStateType } from "../redux/store"

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
  const editingList = useSelector(
    (state: RootStateType) => state.EditingElements.editingList
  )
  const [changedName, setChangedName] = useState(name)

  const { deleteList, changeListName, setEditingList } = useActions()

  useEffect(() => {
    function hideManage(e: any) {
      if (isOptionsPopUpVisible && e.target.tagName !== "LI") {
        setIsOptionsPopUpVisible(false)
      }
    }
    listRef.current.addEventListener("click", hideManage)

    return () =>
      listRef.current && listRef.current.removeEventListener("click", hideManage)
  }, [isOptionsPopUpVisible])

  function handleEdit() {
    setEditingList(id)
    setIsOptionsPopUpVisible(false)
  }
  function handleConfirmNameChange() {
    changeListName({ id, newName: changedName })
    setEditingList(null)
  }
  function handleCancelNameChange() {
    setChangedName(name)
    setEditingList(null)
  }
  const handleKeyDown = onKeyDownEvents(
    handleConfirmNameChange,
    handleCancelNameChange
  )

  return (
    <div className={styles.header}>
      {editingList !== id ? (
        <h3 className={styles.title}>{name}</h3>
      ) : (
        <div className={styles.editField}>
          <input
            type="text"
            value={changedName}
            onChange={(e) => setChangedName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <div className={styles.buttons}>
            <button
              onClick={handleConfirmNameChange}
              className="button-without-background"
            >
              <BsFillCheckCircleFill />
            </button>
            <button
              onClick={handleCancelNameChange}
              className="button-without-background"
            >
              <BsFillXCircleFill />
            </button>
          </div>
        </div>
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
