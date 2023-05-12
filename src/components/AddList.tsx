import { ChangeEvent, FC, KeyboardEvent, MouseEvent, useState } from "react"
import { useActions } from "../hooks/useActions"
import styles from "../styles/AddList.module.scss"
import onKeyDownActions from "../utils/onKeyDownEvents"

const AddList: FC = () => {
  const { addList } = useActions()
  const [isListAdding, setIsListAdding] = useState(false)
  const [listName, setListName] = useState("")
  const [error, setError] = useState<string | null>(null)

  function handleAddList(e?: MouseEvent<HTMLButtonElement>) {
    e?.stopPropagation()
    if (listName.trim() !== "") {
      addList(listName)
      setListName("")
      setIsListAdding(false)
    } else {
      setError("List name can't be empty")
    }
  }
  function handleCancel(e?: MouseEvent<HTMLButtonElement>) {
    e?.stopPropagation()
		setListName('')
    setIsListAdding(false)
    setError(null)
  }
  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setError(null)
    setListName(e.target.value)
  }
  const handleKeyDown = onKeyDownActions(handleAddList, handleCancel)

  return (
    <div
      className={styles.addList}
      onClick={() => {
        setIsListAdding(true)
      }}
    >
      +AddList
      {isListAdding && (
        <div className={styles.addListPopUp}>
          <div className={styles.popUpHeader}>
            <span>Add list</span>
            <button onClick={handleCancel} className={styles.closeButton}>
              x
            </button>
          </div>
          <input
            value={listName}
            onChange={handleNameChange}
            onKeyDown={handleKeyDown}
            className={styles.nameInput}
            type="text"
            placeholder="List name"
          />
          {error && <span className="errorMessage">{error}</span>}
          <button onClick={handleAddList} className={styles.addButton}>
            Add
          </button>
          <div />
        </div>
      )}
    </div>
  )
}

export default AddList
