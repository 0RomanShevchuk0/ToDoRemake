import { FC } from "react"
import { useSelector } from "react-redux"
import { useActions } from "../hooks/useActions"
import { RootStateType } from "../redux/store"
import styles from "../styles/Header.module.scss"

type HeaderPropsType = {
  isGrid: boolean
  setIsGrid: (view: boolean) => void
}

const Header: FC<HeaderPropsType> = ({ isGrid, setIsGrid }) => {
  const { setIsMobileMovingMode, setEditingList, setEditingTask } = useActions()
  const isMobileMovingMode = useSelector(
    (state: RootStateType) => state.DraggingState.isMobileMovingMode
  )
  function handleMobileMovingMode() {
		setEditingList(null)
		setEditingTask(null)
    setIsMobileMovingMode(true)
  }

  return (
    <header className={styles.header}>
      <h3>Trello ToDos</h3>
      {!isMobileMovingMode ? (
        <button onClick={handleMobileMovingMode}>Moving mode</button>
      ) : (
        <button onClick={() => setIsMobileMovingMode(false)}>
          Exit moving mode
        </button>
      )}
      <button onClick={() => setIsGrid(!isGrid)}>
        Switch to {isGrid ? "row" : "grid"}
      </button>
    </header>
  )
}

export default Header
