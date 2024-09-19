import { useCallback, useEffect, useState } from "react"

/**
 * Hook to handle page scroll behavior and hide navbar on scroll.
 *
 * Tracks current scroll position and whether user has scrolled past
 * given threshold. Returns boolean flags for navbar hiding state.
 *
 * @param scrollThreshold - Scroll distance in pixels to trigger navbar hide
 * @returns
 *  - scrolled: boolean for if scroll position past threshold
 *  - hideNavOnScroll: boolean for if navbar should be hidden
 */

export const useScroll = (scrollThreshold: number) => {
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [hideNavOnScroll, setHideNavOnScroll] = useState<boolean>(false)
  const [lastScroll, setLastScroll] = useState<number>(0)

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > scrollThreshold)
  }, [scrollThreshold])

  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY

    if (currentScroll <= 0) {
      setHideNavOnScroll(false)
    }

    if (currentScroll > lastScroll + scrollThreshold && !hideNavOnScroll) {
      setHideNavOnScroll(true)
    } else if (currentScroll < lastScroll && hideNavOnScroll) {
      setHideNavOnScroll(false)
    }

    setLastScroll(currentScroll)
  }, [hideNavOnScroll, lastScroll, scrollThreshold])

  useEffect(() => {
    window.addEventListener("scroll", onScroll)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [onScroll, handleScroll])

  return { scrolled, hideNavOnScroll }
}
