"use client"

import useMediaQuery from "@/hooks/use-media-query"
import { UnderlayActionSheet } from "@/components/ui/underlay-action-sheet"

import StoryContentWrapper from "../story-content-wrapper"

type StoryProps = {
  children?: React.ReactNode
}

export const StoryPageProvider: React.FC<StoryProps> = async ({ children }) => {
  const { isMobile } = useMediaQuery()

  if (isMobile) {
    return (
      <UnderlayActionSheet>
        <StoryContentWrapper>{children}</StoryContentWrapper>
      </UnderlayActionSheet>
    )
  }

  return (
    <section className="flex w-full flex-col">
      <StoryContentWrapper>{children}</StoryContentWrapper>
    </section>
  )
}
