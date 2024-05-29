"use client"

import StoryContentWrapper from "../story-content-wrapper"

type StoryProps = {
  children?: React.ReactNode
}

export const StoryPageProvider: React.FC<StoryProps> = async ({ children }) => {
  // CHORE: TAKEN IT OFF FOR NOW
  // const { isMobile } = useMediaQuery()

  // if (isMobile) {
  //   return (
  //     <UnderlayActionSheet>
  //       <StoryContentWrapper>{children}</StoryContentWrapper>
  //     </UnderlayActionSheet>
  //   )
  // }

  return (
    <section className="flex w-full flex-col">
      <StoryContentWrapper>{children}</StoryContentWrapper>
    </section>
  )
}
