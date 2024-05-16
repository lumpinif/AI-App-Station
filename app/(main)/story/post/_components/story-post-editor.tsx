"use client"

import { useEffect, useState } from "react"
import { Loader2, RotateCw } from "lucide-react"
import { JSONContent } from "novel"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

import { Posts } from "@/types/db_tables"
import { defaultEditorContent } from "@/config/default-editor-content"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"
import NovelEditor from "@/components/editor/advanced-editor"

import { insertStory, removeEmptyStoryContent } from "../../_server/data"
import { StoryEditorInfoPopover } from "./story-editor-info-popover"

type StoryPostEditorProps = {
  post_id: Posts["post_id"]
  post_slug: Posts["post_slug"]
  post_author_id: Posts["post_author_id"]
  post_content: JSONContent
}

// TODO: MOVE CONFIG SOMEWHERE ELSE
// REMBER TO UPDATE THE LIMIT IN THE EXTENSION
export const CHARS_LIMIT = 5000

export const StoryPostEditor: React.FC<StoryPostEditorProps> = ({
  post_id,
  post_slug,
  post_author_id,
  post_content,
}) => {
  if (!post_content || post_content === null) {
    post_content = defaultEditorContent
  }
  const isStoryEmpty =
    JSON.stringify(post_content) ===
    '{"type":"doc","content":[{"type":"paragraph"}]}'

  const [value, setValue] = useState<JSONContent>(post_content)
  const [isRetrying, setIsRetrying] = useState(false)
  const [saveStatus, setSaveStatus] = useState("Saved")
  const [retryCount, setRetryCount] = useState(0)
  const [charsCount, setCharsCount] = useState(0)
  const [isEmpty, setIsEmpty] = useState(false)

  const MAX_RETRY_ATTEMPTS = 3

  useEffect(() => {
    const handleRemoveEmptyStoryContent = async () => {
      if (
        value === null ||
        isStoryEmpty ||
        isEmpty ||
        post_content === defaultEditorContent
      ) {
        // If the editor content is empty and the story is not already null,
        // delete the story from the database
        const { error } = await removeEmptyStoryContent(post_id, post_slug)

        if (error) {
          console.error("Failed to remove empty story", error)
          toast.error("Failed to save story. Please try again later.")
          setSaveStatus("Failed to save")
          return null
        }
      }
    }

    handleRemoveEmptyStoryContent()
  }, [value, isStoryEmpty, isEmpty, post_content, post_id, post_slug])

  const handleEditorDebouncedSave = useDebouncedCallback(
    async (value: JSONContent) => {
      setValue(value)

      // Check if the value is empty and update the isEmpty state immediately
      const isValueEmpty =
        JSON.stringify(value) ===
        '{"type":"doc","content":[{"type":"paragraph"}]}'

      setIsEmpty(isValueEmpty)

      if (post_content !== value) {
        const startTime = Date.now()
        const timeout = 5000 // 5 seconds timeout
        let error = null

        while (
          Date.now() - startTime < timeout &&
          retryCount < MAX_RETRY_ATTEMPTS
        ) {
          error = await insertStory(post_id, JSON.parse(JSON.stringify(value)))
          if (!error?.error) {
            break
          }
          await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second before retrying
        }

        if (error?.error) {
          console.log(
            "Auto-retry failed. Max retry attempts reached or timeout exceeded."
          )
          toast.error("Failed to save story. Please try again later.")
          setSaveStatus("Failed to save")
          setIsRetrying(false) // Set isRetring to false when auto-retry fails
          setRetryCount(0) // Reset retryCount to 0
          return null
        }
        if (saveStatus === "Failed to save") {
          console.log("Auto-retry successful. Story saved.")
          setIsRetrying(false)
          setRetryCount(0)
        }
        setSaveStatus("Saved")
      }
    },
    1000
  )

  const handleRetry = () => {
    if (saveStatus === "Failed to save" && retryCount < MAX_RETRY_ATTEMPTS) {
      setIsRetrying(true)
      setRetryCount((prevCount) => prevCount + 1)
      handleEditorDebouncedSave(value as JSONContent)
    }
  }

  return (
    <TooltipProvider>
      <section className="w-full flex-col space-y-6 sm:space-y-8">
        <div className="flex-col space-y-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="flex items-center space-x-2">
                <h1 className="w-fit select-none text-xl font-semibold hover:cursor-pointer">
                  Enter your story here
                </h1>
                <StoryEditorInfoPopover />
              </span>
            </div>
            <div className="flex items-center gap-x-2">
              {/* TODO: ADD A CLEAR BUTTON FOR THE DEFAUL CONTENT */}
              {/* {!isEmpty &&
                !isStoryEmpty &&
                story === defaultEditorContent && (
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
        <NovelEditor
          uploadTo="story"
          bucketName={
            process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_POST as string
          }
          content_id={post_id}
          user_id={post_author_id}
          initialValue={value}
          onChange={handleEditorDebouncedSave}
          setSaveStatus={setSaveStatus}
          setCharsCount={setCharsCount}
          saveStatus={saveStatus}
          className="border-muted-foreground dark:border-border border border-dashed md:p-8 md:py-4 lg:p-12 lg:py-6"
        />
        {isEmpty && (
          <div className="text-muted-foreground mt-4 text-center">
            The editor is empty. Start typing to add content.
          </div>
        )}
      </section>
    </TooltipProvider>
  )
}
