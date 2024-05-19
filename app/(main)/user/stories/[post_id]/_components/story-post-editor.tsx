"use client"

import { useEffect, useMemo, useState } from "react"
import _ from "lodash"
import { JSONContent } from "novel"
import { useDebouncedCallback } from "use-debounce"

import { Posts } from "@/types/db_tables"
import {
  defaultEditorContent,
  defaultEditorContentWithoutHeading,
} from "@/config/editor/default-editor-content"
import {
  EMPTY_CONTENT_STRING,
  MAX_RETRY_ATTEMPTS,
} from "@/config/editor/editor-config"
import useInsertContent from "@/hooks/editor/use-insert-content"
import useRemoveContent from "@/hooks/editor/use-remove-content"
import useUpdateContentHeading from "@/hooks/editor/use-update-content-heading"
import { TooltipProvider } from "@/components/ui/tooltip"
import NovelEditor from "@/components/editor/advanced-editor"

import {
  insertStoryContent,
  removeEmptyStoryContent,
  updateStoryTitle,
} from "../data"
import { StoryEditorHeader } from "./story-editor-header"

type StoryPostEditorProps = {
  post_id: Posts["post_id"]
  post_title: Posts["post_title"]
  post_slug: Posts["post_slug"]
  post_author_id: Posts["post_author_id"]
  post_content: JSONContent
}

export const StoryPostEditor: React.FC<StoryPostEditorProps> = ({
  post_id,
  post_slug,
  post_title,
  post_author_id,
  post_content,
}) => {
  const initialContent = useMemo(
    () => post_content || defaultEditorContent,
    [post_content]
  )

  const isContentEmpty = _.isEqual(initialContent, EMPTY_CONTENT_STRING)

  const [value, setValue] = useState<JSONContent>(initialContent)
  const [charsCount, setCharsCount] = useState(0)
  const [isEmpty, setIsEmpty] = useState(isContentEmpty)

  const { currentTitle: postTitle } = useUpdateContentHeading({
    content: value,
    defaultTitle: post_title,
    updateTitleService: updateStoryTitle,
    content_id: post_id,
  })

  const { insertContent, saveStatus, setSaveStatus, isRetrying, handleRetry } =
    useInsertContent<Posts["post_id"]>({
      content_id: post_id,
      content: value,
      maxRetryAttempts: MAX_RETRY_ATTEMPTS,
      insertContentService: insertStoryContent,
    })

  const { removeContent } = useRemoveContent<
    Posts["post_id"],
    Posts["post_slug"]
  >({
    content_id: post_id,
    content_slug: post_slug,
    value,
    initialContent,
    removeContentService: removeEmptyStoryContent,
  })

  const handleEditorDebouncedSave = useDebouncedCallback(
    (newValue: JSONContent) => {
      setValue(newValue)

      const isValueEmpty = _.isEqual(newValue, EMPTY_CONTENT_STRING)
      const isContentDefault =
        _.isEqual(newValue, defaultEditorContent) ||
        _.isEqual(value, defaultEditorContentWithoutHeading)

      setIsEmpty(isValueEmpty)

      if (!_.isEqual(post_content, newValue)) {
        insertContent(newValue)
      }

      if (isContentDefault || newValue === null || isValueEmpty) {
        removeContent()
      }
    },
    1000
  )

  useEffect(() => {
    const isContentDefault =
      _.isEqual(value, defaultEditorContent) ||
      _.isEqual(value, defaultEditorContentWithoutHeading)

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
        uploadTo="story"
        bucketName={"posts"}
        content_id={post_id}
        user_id={post_author_id}
        initialValue={value}
        onChange={handleEditorDebouncedSave}
        setSaveStatus={setSaveStatus}
        setCharsCount={setCharsCount}
        saveStatus={saveStatus}
        className="rounded-xl py-3 sm:py-0"
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
      <section className="relative w-full flex-col">
        <StoryEditorHeader
          className="bg-background/60 sticky top-0 z-40 w-full justify-end py-2 backdrop-blur-sm"
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
