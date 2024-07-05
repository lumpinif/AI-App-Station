import { Loader2, RotateCw } from "lucide-react"

import { Posts } from "@/types/db_tables"
import { getStatusColor } from "@/lib/get-status-icon"
import { capitalizeFirstLetter, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type StoryEditorStatusProps = {
  saveStatus: string
  isRetrying: boolean
  handleRetry: () => void
  post_publish_status: Posts["post_publish_status"]
}

export const StoryEditorStatus: React.FC<StoryEditorStatusProps> = ({
  saveStatus,
  isRetrying,
  handleRetry,
  post_publish_status,
}) => {
  const statusColor = getStatusColor(post_publish_status!)

  return (
    <>
      {saveStatus === "Failed to save" && (
        <Button
          size={"sm"}
          variant={"default"}
          disabled={isRetrying}
          onClick={handleRetry}
          className="h-fit rounded-lg px-2 py-1 text-xs"
        >
          <span className="flex items-center space-x-2">
            <RotateCw className={cn("size-4", isRetrying && "animate-spin")} />
            <span className="flex">Retry</span>
          </span>
        </Button>
      )}

      <div
        className={cn(
          "flex select-none rounded-lg bg-accent px-2 py-1 text-xs text-muted-foreground",
          saveStatus === "Failed to save" && "bg-destructive"
        )}
      >
        {saveStatus === "saving" ? (
          <span className="flex items-center space-x-2">
            <Loader2 className="size-4 animate-spin" />
            <span>{saveStatus}</span>
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

      <div
        className={cn(
          "flex select-none rounded-lg bg-accent px-2 py-1 text-xs text-muted-foreground",
          statusColor,
          saveStatus === "Failed to save" && "bg-destructive"
        )}
      >
        {capitalizeFirstLetter(post_publish_status)}
      </div>
    </>
  )
}
