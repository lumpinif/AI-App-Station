"use client"

import { useEffect, useMemo, useState } from "react"
import _ from "lodash"
import { JSONContent } from "novel"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

import { PostDetails, Posts, Topics } from "@/types/db_tables"
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
import useNewStoryToastStore from "@/hooks/use-story-toast-store"
import { TooltipProvider } from "@/components/ui/tooltip"
import NovelEditor from "@/components/editor/advanced-editor"

import {
  insertPostContent,
  removeEmptyPostContent,
  updatePostTitle,
} from "../../../_server/stories"
import { StoryEditorHeader } from "./story-editor-header"

type StoryPostEditorProps = {
  topics?: Topics[]
  post_id: Posts["post_id"]
  post_title: Posts["post_title"]
  post_slug: Posts["post_slug"]
  post_author_id: Posts["post_author_id"]
  post_content: JSONContent
  profiles: PostDetails["profiles"]
  post_description: Posts["post_description"]
}

export const StoryPostEditor: React.FC<StoryPostEditorProps> = ({
  topics,
  post_id,
  profiles,
  post_slug,
  post_title,
  post_content,
  post_author_id,
  post_description,
}) => {
  const toastId = useNewStoryToastStore((state) => state.toastId)
  const setToastId = useNewStoryToastStore((state) => state.setToastId)

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
    profiles: profiles,
    defaultTitle: post_title,
    updateTitleService: updatePostTitle,
    content_id: post_id,
  })

  const { insertContent, saveStatus, setSaveStatus, isRetrying, handleRetry } =
    useInsertContent<Posts["post_id"]>({
      content_id: post_id,
      profiles: profiles,
      content: value,
      maxRetryAttempts: MAX_RETRY_ATTEMPTS,
      insertContentService: insertPostContent,
    })

  const { removeContent } = useRemoveContent<
    Posts["post_id"],
    Posts["post_slug"]
  >({
    content_id: post_id,
    profiles: profiles,
    content_slug: post_slug,
    value,
    removeContentService: removeEmptyPostContent,
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

  useEffect(() => {
    if (toastId) {
      toast.success("The editor has been launched! 🎉", {
        id: toastId,
        duration: 3000,
        description: "Happy writing",
      })
    }

    // Reset toastId after showing the toast
    setToastId(undefined)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastId]) // Empty dependency array means this effect runs once on mount and not on updates

  const memoizedNovelEditor = useMemo(
    () => (
      <NovelEditor
        uploadTo="story"
        bucketName={"posts"}
        content_id={post_id}
        initialValue={value}
        saveStatus={saveStatus}
        user_id={post_author_id}
        setSaveStatus={setSaveStatus}
        setCharsCount={setCharsCount}
        onChange={handleEditorDebouncedSave}
        className="rounded-xl py-8 sm:py-10"
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
          topics={topics}
          post_id={post_id}
          postTitle={postTitle}
          isRetrying={isRetrying}
          saveStatus={saveStatus}
          charsCount={charsCount}
          handleRetry={handleRetry}
          post_description={post_description}
          className="sticky top-0 z-40 w-full bg-background/60 py-2 backdrop-blur-sm"
        />
        {memoizedNovelEditor}
        {isEmpty && (
          <div className="mt-4 text-center text-muted-foreground">
            The editor is empty. Start typing to add content.
          </div>
        )}
      </section>
    </TooltipProvider>
  )
}
