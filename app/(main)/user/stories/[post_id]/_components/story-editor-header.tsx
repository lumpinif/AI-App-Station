import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { StoryEditorInfoPopover } from "./story-editor-info-popover"
import { StoryEditorStatus } from "./story-editor-status"
import { StoryEditorWordsCount } from "./story-editor-words-count"
import { StoryPublishModal } from "./story-publish-modal"

type StoryEditorHeaderProps = {
  className?: string
  charsCount: number
  saveStatus: string
  handleRetry: () => void
  isRetrying: boolean
}

export const StoryEditorHeader: React.FC<StoryEditorHeaderProps> = ({
  charsCount,
  saveStatus,
  isRetrying,
  handleRetry,
  className,
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
        <StoryPublishModal />
      </div>
    </div>
  )
}
