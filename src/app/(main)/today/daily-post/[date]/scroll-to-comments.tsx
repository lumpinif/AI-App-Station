"use client"

import { useEffect } from "react"

import { scrollToSection } from "@/lib/utils"
import { useHash } from "@/hooks/use-hash"

type ScrollToCommentsProps = {
  children?: React.ReactNode
}

const ScrollToComments = ({ children }: ScrollToCommentsProps) => {
  const hash = useHash()

  useEffect(() => {
    if (hash.includes(`story-comments-section`)) {
      scrollToSection(`story-comments-section`)
    }

    if (hash.includes(`comments-section`)) {
      scrollToSection(`comments-section`)
    }
  }, [hash])

  return <>{children}</>
}

export default ScrollToComments
