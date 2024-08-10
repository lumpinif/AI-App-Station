import { useCallback, useEffect, useRef } from "react"
import { useDebouncedCallback } from "use-debounce"

import useSideMenu from "@/hooks/use-side-menu"

export const usePinnableSideMenu = () => {
  const isOpen = useSideMenu((state) => state.isOpen)
  const isPinned = useSideMenu((state) => state.isPinned)
  const openMenu = useSideMenu((state) => state.openMenu)
  const closeMenu = useSideMenu((state) => state.closeMenu)
  const togglePin = useSideMenu((state) => state.togglePin)
  const setHovered = useSideMenu((state) => state.setHovered)
  const isFullyCollapsed = useSideMenu((state) => state.isFullyCollapsed)
  const setFullyCollapsed = useSideMenu((state) => state.setFullyCollapsed)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const clearTimeoutRef = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const setAutoCollapseTimeout = useCallback(() => {
    clearTimeoutRef()
    if (!isPinned) {
      timeoutRef.current = setTimeout(() => {
        closeMenu()
        setHovered(false)
        setFullyCollapsed(true)
      }, 5000) // 5 seconds delay for auto-collapse
    }
  }, [isPinned, closeMenu, setHovered, setFullyCollapsed, clearTimeoutRef])

  const handleMouseEnter = useCallback(() => {
    clearTimeoutRef()
    if (!isPinned) {
      setFullyCollapsed(false)
      openMenu()
      setHovered(true)
    }
  }, [isPinned, setFullyCollapsed, openMenu, setHovered, clearTimeoutRef])

  const handleMouseLeave = useCallback(() => {
    clearTimeoutRef()
    if (!isPinned) {
      timeoutRef.current = setTimeout(() => {
        closeMenu()
        setHovered(false)
        timeoutRef.current = setTimeout(() => {
          setFullyCollapsed(true)
        }, 4000) // 4 seconds after closing, fully collapse
      }, 1000) // 1 second delay before closing
    }
  }, [isPinned, closeMenu, setHovered, setFullyCollapsed, clearTimeoutRef])

  const debouncedTogglePin = useDebouncedCallback(
    () => {
      togglePin()
      setAutoCollapseTimeout()
    },
    300,

    { leading: true, trailing: true, maxWait: 1000 }
  )

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === " " && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        debouncedTogglePin()
      }
    },
    [debouncedTogglePin]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)
    setAutoCollapseTimeout()

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
      clearTimeoutRef()
    }
  }, [handleKeyPress, setAutoCollapseTimeout, clearTimeoutRef])

  return {
    isOpen,
    isPinned,
    isFullyCollapsed,
    handleMouseEnter,
    handleMouseLeave,
  }
}
