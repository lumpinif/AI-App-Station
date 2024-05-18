import { Loader2, RotateCw } from "lucide-react"

import { CHARS_LIMIT } from "@/config/editor/editor-config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { IntroductionEditorInfoPopover } from "./introduction-editor-info-popover"

type IntroductionEditorHeaderProps = {
  charsCount: number
  saveStatus: string
  handleRetry: () => void
  isRetrying: boolean
}

export const IntroductionEditorHeader: React.FC<
  IntroductionEditorHeaderProps
> = ({ charsCount, saveStatus, isRetrying, handleRetry }) => {
  return (
    <div className="flex-col space-y-2">
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline space-x-2">
          <span className="flex items-center space-x-2">
            <h1 className="w-fit select-none text-xl font-semibold hover:cursor-pointer">
              App Inroduction
            </h1>
            <IntroductionEditorInfoPopover />
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          {/* TODO: ADD A CLEAR BUTTON FOR THE DEFAUL CONTENT */}
          {/* {!isEmpty &&
                !isIntroductionEmpty &&
                introduction === defaultEditorContent && (
                  <Button
                    size={"sm"}
                    className="bg-accent hover:bg-accent/80 text-muted-foreground h-fit rounded-lg px-2 py-1 text-xs"
                    variant={"default"}
                    onClick={handleClearDefaultContent}
                    disabled={isEmpty}
                  >
                    <span className="flex items-center gap-x-2">
                      <span className="flex">Clear the default content</span>
                    </span>
                  </Button>
                )} */}

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
      </div>
      {/* <Separator /> */}
      <span className="text-muted-foreground/80 flex cursor-default select-none text-xs">
        Select text to edit or Press &apos;/&apos; for commands
      </span>
    </div>
  )
}
