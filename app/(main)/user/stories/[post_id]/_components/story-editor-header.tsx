import { Categories, Posts, Topics } from "@/types/db_tables"
import { cn } from "@/lib/utils"

import { StoryEditorInfoPopover } from "./story-editor-info-popover"
import { StoryEditorStatus } from "./story-editor-status"
import { StoryEditorWordsCount } from "./story-editor-words-count"
import { StoryPublishModal } from "./story-publish/story-publish-modal"

type StoryEditorHeaderProps = {
  isEmpty?: boolean
  className?: string
  topics?: Topics[]
  postTitle: string
  charsCount: number
  saveStatus: string
  isEdited?: boolean
  isRetrying: boolean
  handleRetry: () => void
  post_id: Posts["post_id"]
  postCategories?: Categories[]
  postImagesPublicUrls?: string[]
  allCategories?: Categories[] | null
  post_author_id: Posts["post_author_id"]
  post_description: Posts["post_description"]
}

export const StoryEditorHeader: React.FC<StoryEditorHeaderProps> = ({
  topics,
  post_id,
  isEmpty,
  className,
  postTitle,
  charsCount,
  saveStatus,
  isRetrying,
  handleRetry,
  allCategories,
  post_author_id,
  postCategories,
  isEdited = false,
  post_description,
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
            topics={topics}
            post_id={post_id}
            postTitle={postTitle}
            allCategories={allCategories}
            postCategories={postCategories}
            post_description={post_description}
            post_author_id={post_author_id}
            postImagesPublicUrls={postImagesPublicUrls}
            disabled={
              saveStatus === "saving" || isRetrying || isEmpty || !isEdited
            }
          />
        )}
      </div>
    </div>
  )
}
