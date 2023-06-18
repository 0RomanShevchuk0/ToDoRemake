import { FC, MutableRefObject, useEffect } from "react"
import { useActions } from "../hooks/useActions"
import styles from "../styles/ToDoList.module.scss"
import { SlOptions } from "react-icons/sl"
import { useSelector } from "react-redux"
import { RootStateType } from "../redux/store"
import ListEditField from "./ListEditField"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

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
  const isMobileMovingMode = useSelector(
    (state: RootStateType) => state.DraggingState.isMobileMovingMode
  )

  const { deleteList, setEditingList, moveListMobile } = useActions()

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

  return (
    <div className={styles.header}>
      {editingList !== id ? (
        <h3 className={styles.title}>{name}</h3>
      ) : (
        <ListEditField id={id} name={name} />
      )}

      {!isMobileMovingMode ? (
        <button
          className="button-without-background x-mark"
          onClick={() => setIsOptionsPopUpVisible(true)}
        >
          <SlOptions />
        </button>
      ) : (
        <div>
          <button
            className="button-without-background x-mark"
            onClick={() => moveListMobile({ listId: id, destination: "up" })}
          >
            <IoIosArrowBack />
          </button>
          <button
            className="button-without-background x-mark"
            onClick={() => moveListMobile({ listId: id, destination: "down" })}
          >
            <IoIosArrowForward />
          </button>
        </div>
      )}
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
