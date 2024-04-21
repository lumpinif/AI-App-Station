import { RefObject, useEffect } from "react"

// Defining the hook with generic type for flexibility
function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    // Add event listeners
    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler]) // Re-run if ref or handler changes
}

export default useClickOutside
