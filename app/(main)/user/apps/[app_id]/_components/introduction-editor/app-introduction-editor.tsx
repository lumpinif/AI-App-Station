"use client"

import { useEffect, useMemo, useState } from "react"
import _ from "lodash"
import { JSONContent } from "novel"
import { useDebouncedCallback } from "use-debounce"

import { Apps } from "@/types/db_tables"
import { defaultEditorContent } from "@/config/editor/default-editor-content"
import {
  EMPTY_CONTENT_STRING,
  MAX_RETRY_ATTEMPTS,
} from "@/config/editor/editor-config"
import useInsertContent from "@/hooks/editor/use-insert-content"
import useRemoveContent from "@/hooks/editor/use-remove-content"
import { TooltipProvider } from "@/components/ui/tooltip"
import NovelEditor from "@/components/editor/advanced-editor"

import { insertIntroduction, removeEmptyIntroduction } from "../_server"
import { IntroductionEditorHeader } from "./introduction-editor-header"

type AppIntroductionEditorProps = {
  app_id: Apps["app_id"]
  app_slug: Apps["app_slug"]
  submitted_by_user_id: Apps["submitted_by_user_id"]
  introduction: JSONContent
}

export const AppIntroductionEditor: React.FC<AppIntroductionEditorProps> = ({
  app_id,
  app_slug,
  submitted_by_user_id,
  introduction,
}) => {
  const initialContent = useMemo(
    () => introduction || defaultEditorContent,
    [introduction]
  )

  const isContentEmpty = _.isEqual(initialContent, EMPTY_CONTENT_STRING)

  const [value, setValue] = useState<JSONContent>(initialContent)
  const [charsCount, setCharsCount] = useState(0)
  const [isEmpty, setIsEmpty] = useState(isContentEmpty)

  const { insertContent, saveStatus, setSaveStatus, isRetrying, handleRetry } =
    useInsertContent<Apps["app_id"]>({
      content_id: app_id,
      content: value,
      maxRetryAttempts: MAX_RETRY_ATTEMPTS,
      insertContentService: insertIntroduction,
    })

  const { removeContent } = useRemoveContent<Apps["app_id"], Apps["app_slug"]>({
    content_id: app_id,
    content_slug: app_slug,
    value,
    initialContent,
    removeContentService: removeEmptyIntroduction,
  })

  const handleEditorDebouncedSave = useDebouncedCallback(
    (newValue: JSONContent) => {
      setValue(newValue)

      const isValueEmpty = _.isEqual(newValue, EMPTY_CONTENT_STRING)
      const isContentDefault = _.isEqual(newValue, defaultEditorContent)

      setIsEmpty(isValueEmpty)

      if (!_.isEqual(introduction, newValue)) {
        insertContent(newValue)
      }

      if (isContentDefault || newValue === null || isValueEmpty) {
        removeContent()
      }
    },
    1000
  )

  useEffect(() => {
    const isContentDefault = _.isEqual(value, defaultEditorContent)

    if (
      value === null ||
      isContentDefault ||
      _.isEqual(value, EMPTY_CONTENT_STRING)
    ) {
      removeContent()
    }
  }, [value, removeContent])

  const memoizedNovelEditor = useMemo(
    () => (
      <NovelEditor
        uploadTo="introduction"
        bucketName={"apps"}
        content_id={app_id}
        user_id={submitted_by_user_id}
        initialValue={value}
        onChange={handleEditorDebouncedSave}
        setSaveStatus={setSaveStatus}
        setCharsCount={setCharsCount}
        saveStatus={saveStatus}
        className="border-muted-foreground dark:border-border border border-dashed md:p-8 md:py-4 lg:p-12 lg:py-6"
      />
    ),
    [
      app_id,
      handleEditorDebouncedSave,
      saveStatus,
      setSaveStatus,
      submitted_by_user_id,
      value,
    ]
  )

  return (
    <TooltipProvider>
      <section className="w-full flex-col space-y-6 sm:space-y-8">
        <IntroductionEditorHeader
          isRetrying={isRetrying}
          saveStatus={saveStatus}
          charsCount={charsCount}
          handleRetry={handleRetry}
        />
        {memoizedNovelEditor}
        {isEmpty && (
          <div className="text-muted-foreground mt-4 text-center">
            The editor is empty. Start typing to add content.
          </div>
        )}
      </section>
    </TooltipProvider>
  )
}
