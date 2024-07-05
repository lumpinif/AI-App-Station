import { Categories, PostDetails } from "@/types/db_tables"
import { cn } from "@/lib/utils"

import { StoryEditorInfoPopover } from "./story-editor-info-popover"
import { StoryEditorStatus } from "./story-editor-status"
import { StoryEditorWordsCount } from "./story-editor-words-count"
import { StoryPublishModal } from "./story-publish/story-publish-modal"

type StoryEditorHeaderProps = {
  post: PostDetails
  isEmpty?: boolean
  className?: string
  currentTitle: string
  charsCount: number
  saveStatus: string
  isEdited?: boolean
  isRetrying: boolean
  handleRetry: () => void
  postImagesPublicUrls: string[]
  allCategories?: Categories[] | null
}

export const StoryEditorHeader: React.FC<StoryEditorHeaderProps> = ({
  post,
  isEmpty,
  className,
  currentTitle,
  charsCount,
  saveStatus,
  isRetrying,
  handleRetry,
  allCategories,
  isEdited = false,
  postImagesPublicUrls,
}) => {
  return (
    <div className={cn("flex-col space-y-2", className)}>
      <div className="flex items-center justify-between gap-x-2">
        <span className="flex flex-col gap-y-2">
          <span className="flex items-center gap-x-2">
            <StoryEditorWordsCount charsCount={charsCount} />

            <StoryEditorStatus
              saveStatus={saveStatus}
              isRetrying={isRetrying}
              handleRetry={handleRetry}
              post_publish_status={post.post_publish_status}
            />

            <StoryEditorInfoPopover />
          </span>
          <span className="flex cursor-default select-none justify-end text-xs text-muted-foreground/80">
            Select text to edit or Press &apos;/&apos; for commands
          </span>
        </span>

        {/* Publish Modal */}
        {isEmpty ? null : (
          <StoryPublishModal
            post={post}
            isEmpty={isEmpty}
            isEdited={isEdited}
            isRetrying={isRetrying}
            saveStatus={saveStatus}
            currentTitle={currentTitle}
            allCategories={allCategories}
            postImagesPublicUrls={postImagesPublicUrls}
          />
        )}
      </div>
    </div>
  )
}
