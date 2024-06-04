import StoryContentWrapper from "../_components/story-content/story-content-wrapper"
import { WriteNewStoryButton } from "../_components/story-content/write-new-story-button"

export default function StoryPage() {
  return (
    <main>
      <StoryContentWrapper>
        <div className="flex h-[calc(100vh-25rem)] w-full items-center justify-center">
          <div className="flex flex-col items-center gap-y-6">
            <span className="page-title-font text-3xl">
              Click the button to Write a new story
            </span>
            <WriteNewStoryButton
              variant={"default"}
              size={"default"}
              spinnerButtonCN="w-40 rounded-full border dark:border-0 dark:shadow-outline"
            />
          </div>
        </div>
      </StoryContentWrapper>
    </main>
  )
}
