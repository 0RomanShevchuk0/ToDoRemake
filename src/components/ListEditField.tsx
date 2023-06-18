import { FC, useState } from 'react'
import styles from "../styles/ToDoList.module.scss"
import onKeyDownEvents from '../utils/onKeyDownEvents'
import { useActions } from '../hooks/useActions'
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs"

type PropsType = {
	id: string
	name: string
}

const ListEditField: FC<PropsType> = ({id, name}) => {
  const { changeListName, setEditingList } = useActions()

  const [changedName, setChangedName] = useState(name)

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
	)
}

export default ListEditField