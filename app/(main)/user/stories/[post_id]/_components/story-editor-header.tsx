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
  postImagesPublicUrls: string[]
  allCategories?: Categories[] | null
  post_image_src: Posts["post_image_src"]
  post_author_id: Posts["post_author_id"]
  post_description: Posts["post_description"]
  post_publish_status: Posts["post_publish_status"]
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
  post_image_src,
  isEdited = false,
  post_description,
  post_publish_status,
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
            isEmpty={isEmpty}
            post_id={post_id}
            isEdited={isEdited}
            postTitle={postTitle}
            isRetrying={isRetrying}
            saveStatus={saveStatus}
            allCategories={allCategories}
            post_image_src={post_image_src}
            postCategories={postCategories}
            post_author_id={post_author_id}
            post_description={post_description}
            post_publish_status={post_publish_status}
            postImagesPublicUrls={postImagesPublicUrls}
          />
        )}
      </div>
    </div>
  )
}
