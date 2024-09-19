import { RefObject, useEffect } from "react"

// Defining the hook with generic type for flexibility
function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  ignoreState: boolean = false,
  ignoreRefs?: RefObject<HTMLElement>[]
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current

      // Do nothing if ignoreState is true
      if (ignoreState) {
        return
      }

      // Ignore clicks inside the provided ignoreRefs
      if (
        ignoreRefs?.some((ignoreRef) =>
          ignoreRef.current?.contains(event.target as Node)
        )
      ) {
        return
      }

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
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
  }, [ref, handler, ignoreRefs, ignoreState]) // Re-run if ref or handler changes
}

export default useClickOutside
