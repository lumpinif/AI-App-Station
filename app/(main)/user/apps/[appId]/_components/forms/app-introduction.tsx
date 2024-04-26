"use client"

import { useState } from "react"
import { insertIntroduction } from "@/server/data/supabase"
import { Loader2 } from "lucide-react"
import { JSONContent } from "novel"
import { useDebouncedCallback } from "use-debounce"

import { App } from "@/types/db_tables"
import { defaultEditorContent } from "@/lib/editor-dummy-content"
import { cn } from "@/lib/utils"
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
  const [saveStatus, setSaveStatus] = useState("Saved")

  const handleEditorSave = useDebouncedCallback(async (value: JSONContent) => {
    setValue(value)
    if (introduction !== value) {
      const error = await insertIntroduction(
        app_id,
        JSON.parse(JSON.stringify(value))
      )
      if (error?.error) {
        setSaveStatus("Failed to save")
        return null
      }
      setSaveStatus("Saved")
    }
  }, 1500)

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
                    <span className="text-primary">
                      {saveStatus} Please try again
                    </span>
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
