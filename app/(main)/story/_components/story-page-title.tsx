import { PageTitle } from "@/components/layout/page-title"

import { StoryPostButton } from "./story/story-post-button"

const StoryPageTitle = () => {
  return (
    <PageTitle title="Story" href="/story">
      <StoryPostButton />
    </PageTitle>
  )
}

export default StoryPageTitle
