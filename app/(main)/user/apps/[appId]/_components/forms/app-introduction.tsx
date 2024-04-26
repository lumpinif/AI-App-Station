"use client"

import { useState } from "react"
import { insertIntroduction } from "@/server/data/supabase"
import { Loader2, RotateCw } from "lucide-react"
import { JSONContent } from "novel"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

import { App } from "@/types/db_tables"
import { defaultEditorContent } from "@/lib/editor-dummy-content"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import NovelEditor from "@/components/editor/advanced-editor"

type AppIntroductionFormProps = {
  app_id: App["app_id"]
  introduction: JSONContent
}

export const AppIntroductionForm: React.FC<AppIntroductionFormProps> = ({
  app_id,
  introduction,
}) => {
  if (!introduction || introduction === null) {
    introduction = defaultEditorContent
  }
  const [value, setValue] = useState<JSONContent>(introduction)
  const [isRetrying, setIsRetrying] = useState(false)
  const [saveStatus, setSaveStatus] = useState("Saved")
  const [retryCount, setRetryCount] = useState(0)
  const MAX_RETRY_ATTEMPTS = 3

  const handleEditorSave = useDebouncedCallback(async (value: JSONContent) => {
    setValue(value)
    if (introduction !== value) {
      const startTime = Date.now()
      const timeout = 5000 // 5 seconds timeout
      let error = null

      while (
        Date.now() - startTime < timeout &&
        retryCount < MAX_RETRY_ATTEMPTS
      ) {
        error = await insertIntroduction(
          app_id,
          JSON.parse(JSON.stringify(value))
        )
        if (!error?.error) {
          break
        }
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second before retrying
      }

      if (error?.error) {
        console.log(
          "Auto-retry failed. Max retry attempts reached or timeout exceeded."
        )
        toast.error("Failed to save introduction. Please try again later.")
        setSaveStatus("Failed to save")
        setIsRetrying(false) // Set isRetring to false when auto-retry fails
        setRetryCount(0) // Reset retryCount to 0
        return null
      }
      if (saveStatus === "Failed to save") {
        console.log("Auto-retry successful. Introduction saved.")
        setIsRetrying(false)
        setRetryCount(0)
      }
      setSaveStatus("Saved")
    }
  }, 1500)

  const handleRetry = () => {
    if (saveStatus === "Failed to save" && retryCount < MAX_RETRY_ATTEMPTS) {
      console.log("Retry button clicked. Starting auto-retry...")
      setIsRetrying(true)
      setRetryCount((prevCount) => prevCount + 1)
      handleEditorSave(value)
    }
  }

  return (
    <section className="w-full flex-col space-y-4">
      <div className="flex-col space-y-2">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline space-x-2">
            <h1 className="w-fit cursor-default select-none text-2xl font-semibold tracking-wide">
              App Introduction
            </h1>
          </div>
          <div className="flex items-center space-x-2">
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
                "flex select-none rounded-lg bg-accent px-2 py-1 text-xs text-muted-foreground",
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
        <span className="flex cursor-default select-none text-xs text-muted-foreground/80">
          Select text to edit or Press &apos;/&apos; for commands
        </span>
      </div>
      <NovelEditor
        initialValue={value}
        onChange={handleEditorSave}
        setSaveStatus={setSaveStatus}
        saveStatus={saveStatus}
        className="border border-dashed border-muted-foreground pt-2 dark:border-border"
      />
    </section>
  )
}
