import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useActions } from "../hooks/useActions"
import { RootStateType } from "../redux/store"
import styles from "../styles/Header.module.scss"
import { FaGripHorizontal, FaGripVertical } from "react-icons/fa"
import { TbHandMove } from "react-icons/tb"
import { ImCheckmark2 } from "react-icons/im"

type HeaderPropsType = {
  isGrid: boolean
  setIsGrid: (view: boolean) => void
}

const Header: FC<HeaderPropsType> = ({ isGrid, setIsGrid }) => {
  const { setIsMobileMovingMode, setEditingList, setEditingTask } = useActions()
  const isMobileMovingMode = useSelector(
    (state: RootStateType) => state.DraggingState.isMobileMovingMode
  )
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024 ? true : false)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1024) {
        setIsDesktop(true)
      } else {
        setIsDesktop(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  function handleMobileMovingMode() {
    setEditingList(null)
    setEditingTask(null)
    setIsMobileMovingMode(true)
  }
  function handleViewChange() {
    localStorage.setItem("view", isGrid ? "flex" : "grid")
    setIsGrid(!isGrid)
  }

  return (
    <header className={styles.header}>
      <h3>Trello ToDos</h3>
      {isDesktop ? (
        <>
          <button onClick={handleViewChange}>
            Switch to {isGrid ? "row" : "grid"}
          </button>
        </>
      ) : (
        <div className={styles.mobileButtons}>
          {!isMobileMovingMode ? (
            <button onClick={handleMobileMovingMode}>
              <TbHandMove />
            </button>
          ) : (
            <button onClick={() => setIsMobileMovingMode(false)}>
              <ImCheckmark2 />
            </button>
          )}
          <button onClick={handleViewChange}>
            {isGrid ? <FaGripHorizontal /> : <FaGripVertical />}
          </button>
        </div>
      )}
    </header>
  )
}

export default Header
