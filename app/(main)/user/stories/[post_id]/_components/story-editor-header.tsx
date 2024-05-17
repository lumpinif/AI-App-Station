import { Loader2, RotateCw } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { StoryEditorInfoPopover } from "./story-editor-info-popover"

type StoryEditorHeaderProps = {
  charsCount: number
  saveStatus: string
  handleRetry: () => void
  isRetrying: boolean
}

// TODO: MOVE CONFIG SOMEWHERE ELSE
// REMBER TO UPDATE THE LIMIT IN THE EXTENSION
export const CHARS_LIMIT = 5000

export const StoryEditorHeader: React.FC<StoryEditorHeaderProps> = ({
  charsCount,
  saveStatus,
  isRetrying,
  handleRetry,
}) => {
  return (
    <div className="flex-col space-y-2">
      <div className="flex items-center justify-end gap-x-2">
        <div className="flex items-center gap-x-2">
          <div className="bg-accent text-muted-foreground flex h-fit select-none rounded-lg px-2 py-1 text-xs">
            <span>
              {charsCount}/{CHARS_LIMIT}
            </span>
          </div>

          {saveStatus === "Failed to save" && (
            <Button
              size={"sm"}
              className="h-fit rounded-lg px-2 py-1 text-xs"
              variant={"default"}
              onClick={handleRetry}
              disabled={isRetrying}
            >
              <span className="flex items-center space-x-2">
                <RotateCw
                  className={cn("size-4", isRetrying && "animate-spin")}
                />
                <span className="flex">Retry</span>
              </span>
            </Button>
          )}
          <div
            className={cn(
              "bg-accent text-muted-foreground flex select-none rounded-lg px-2 py-1 text-xs",
              saveStatus === "Failed to save" && "bg-destructive"
            )}
          >
            {saveStatus === "saving" ? (
              <span className="flex items-center space-x-2">
                <span>{saveStatus}</span>
                <Loader2 className="size-4 animate-spin" />
              </span>
            ) : (
              <>
                {saveStatus === "Failed to save" ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-background dark:text-primary">
                      {saveStatus}
                    </span>
                  </div>
                ) : (
                  saveStatus
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="flex items-center space-x-2">
            <StoryEditorInfoPopover />
          </span>
        </div>
      </div>

      <span className="text-muted-foreground/80 flex cursor-default select-none justify-end text-xs">
        Select text to edit or Press &apos;/&apos; for commands
      </span>
    </div>
  )
}
