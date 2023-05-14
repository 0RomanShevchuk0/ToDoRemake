import { KeyboardEvent } from "react"

function onKeyDownEvents(
  onEnter: () => void,
  onEscape: () => void
) {
  return (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.code === "Enter") {
      onEnter()
    } else if (e.code === "Escape") {
      onEscape()
    }
  }
}

export default onKeyDownEvents
