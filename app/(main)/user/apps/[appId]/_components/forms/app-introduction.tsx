"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { JSONContent } from "novel"
import { useDebouncedCallback } from "use-debounce"

import { defaultEditorContent } from "@/lib/editor-dummy-content"
import { Separator } from "@/components/ui/separator"
import NovelEditor from "@/components/editor/advanced-editor"

type AppIntroductionFormProps = {}

export const AppIntroductionForm: React.FC<AppIntroductionFormProps> = ({}) => {
  const [saveStatus, setSaveStatus] = useState("Saved")
  const handleEditorSave = useDebouncedCallback(async (value) => {
    // console.log("Saved", value)
    setValue(value)
    setSaveStatus("Saved")
  }, 1000)

  const [value, setValue] = useState<JSONContent>(defaultEditorContent)
  console.log(value)
  return (
    <section className="w-full flex-col space-y-4">
      <div className="flex-col space-y-2">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline space-x-2">
            <h1 className="w-fit text-2xl font-semibold tracking-wide">
              App Introduction
            </h1>
            <span className="text-sm text-muted-foreground">Editor</span>
          </div>
          <div className="flex rounded-lg bg-accent px-2 py-1 text-xs text-muted-foreground">
            {saveStatus === "saving" ? (
              <span className="flex items-center space-x-2">
                <span>{saveStatus}</span>
                <Loader2 className="size-4 animate-spin" />
              </span>
            ) : (
              saveStatus
            )}
          </div>
        </div>
        <Separator />
        <span className="flex justify-end text-xs text-muted-foreground">
          Select text to edit or Press &apos;/&apos; for commands
        </span>
      </div>
      <NovelEditor
        initialValue={value}
        onChange={handleEditorSave}
        setSaveStatus={setSaveStatus}
        saveStatus={saveStatus}
      />
    </section>
  )
}
