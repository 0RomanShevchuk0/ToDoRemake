import { FC } from "react"
import styles from "../styles/Header.module.scss"

type HeaderPropsType = {
  isGrid: boolean
  setIsGrid: (view: boolean) => void
}

const Header: FC<HeaderPropsType> = ({ isGrid, setIsGrid }) => {
  return (
    <header className={styles.header}>
      Header
      <button onClick={() => setIsGrid(!isGrid)}>
        Switch to {isGrid ? 'row' : 'grid'}
      </button>
    </header>
  )
}

export default Header
