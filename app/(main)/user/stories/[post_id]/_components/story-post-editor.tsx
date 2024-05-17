"use client"

import { useEffect, useMemo, useState } from "react"
import _ from "lodash"
import { JSONContent } from "novel"
import { useDebouncedCallback } from "use-debounce"

import { Posts } from "@/types/db_tables"
import { defaultEditorContent } from "@/config/default-editor-content"
import useInsertStory from "@/hooks/story-editor/use-insert-story"
import useRemoveEmptyStory from "@/hooks/story-editor/use-remove-empty-story"
import { TooltipProvider } from "@/components/ui/tooltip"
import NovelEditor from "@/components/editor/advanced-editor"

import { StoryEditorHeader } from "./story-editor-header"

type StoryPostEditorProps = {
  post_id: Posts["post_id"]
  post_slug: Posts["post_slug"]
  post_author_id: Posts["post_author_id"]
  post_content: JSONContent
}

// TODO: CONSIDER MOVING THESE TO A CONFIG FILE
const MAX_RETRY_ATTEMPTS = 3
const EMPTY_CONTENT_STRING = '{"type":"doc","content":[{"type":"paragraph"}]}'

export const StoryPostEditor: React.FC<StoryPostEditorProps> = ({
  post_id,
  post_slug,
  post_author_id,
  post_content,
}) => {
  const initialContent = useMemo(
    () => post_content || defaultEditorContent,
    [post_content]
  )

  const isStoryEmpty = JSON.stringify(initialContent) === EMPTY_CONTENT_STRING

  const [value, setValue] = useState<JSONContent>(initialContent)
  const [charsCount, setCharsCount] = useState(0)
  const [isEmpty, setIsEmpty] = useState(isStoryEmpty)

  const { insertStory, saveStatus, isRetrying, handleRetry, setSaveStatus } =
    useInsertStory({
      post_id,
      post_content: value,
      maxRetryAttempts: MAX_RETRY_ATTEMPTS,
    })

  const { removeEmptyStoryContent } = useRemoveEmptyStory({
    post_id,
    post_slug,
    value,
    initialContent,
  })

  const handleEditorDebouncedSave = useDebouncedCallback(
    (newValue: JSONContent) => {
      setValue(newValue)

      const isValueEmpty = JSON.stringify(newValue) === EMPTY_CONTENT_STRING
      const isStoryDefault = _.isEqual(newValue, defaultEditorContent)

      setIsEmpty(isValueEmpty)

      if (!_.isEqual(post_content, newValue)) {
        insertStory(newValue)
      }

      if (isStoryDefault || newValue === null || isValueEmpty) {
        console.log("🚀 ~ isStoryDefault:", isStoryDefault)
        console.log("calling removeEmptyStoryContent!!!")
        removeEmptyStoryContent()
      }
    },
    1000
  )

  useEffect(() => {
    const isStoryDefault = _.isEqual(value, defaultEditorContent)

    if (
      value === null ||
      isStoryDefault ||
      JSON.stringify(value) === EMPTY_CONTENT_STRING
    ) {
      console.log("calling removeEmptyStoryContent!!!")
      removeEmptyStoryContent()
    }
  }, [value, removeEmptyStoryContent])

  const memoizedNovelEditor = useMemo(
    () => (
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
        className="border-0"
      />
    ),
    [
      post_id,
      post_author_id,
      value,
      handleEditorDebouncedSave,
      setSaveStatus,
      saveStatus,
    ]
  )

  return (
    <TooltipProvider>
      <section className="w-full flex-col space-y-6 sm:space-y-8">
        <StoryEditorHeader
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
