"use client"

import { useEffect, useMemo, useState } from "react"
import { draftStory } from "@/server/queries/supabase/stories/table/post-table-services"
import _ from "lodash"
import { JSONContent } from "novel"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

import { Categories, PostDetails, Posts } from "@/types/db_tables"
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
  post: PostDetails
  post_content: JSONContent
  postImagesPublicUrls: string[]
  allCategories?: Categories[] | null
}

export const StoryPostEditor: React.FC<StoryPostEditorProps> = ({
  post,
  post_content,
  allCategories,
  postImagesPublicUrls,
}) => {
  const { post_id, profiles, post_slug, post_title, post_author_id } = post

  const initialContent = useMemo(
    () => post_content || defaultEditorContent,
    [post_content]
  )
  const isContentEmpty = _.isEqual(initialContent, EMPTY_CONTENT_STRING)

  const [charsCount, setCharsCount] = useState(0)
  const [isEmpty, setIsEmpty] = useState(isContentEmpty)
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [value, setValue] = useState<JSONContent>(initialContent)

  const toastId = useNewStoryToastStore((state) => state.toastId)
  const setToastId = useNewStoryToastStore((state) => state.setToastId)

  const isContentDefault =
    _.isEqual(value, defaultEditorContent) ||
    _.isEqual(value, defaultEditorContentWithoutHeading)

  const { currentTitle } = useUpdateContentHeading({
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
        setIsEdited(true)
      }

      if (isContentDefault || newValue === null || isValueEmpty) {
        removeContent()

        const draftProcess = async () => {
          const { error: draftStoryError } = await draftStory(post_id)
          if (draftStoryError) {
            console.error("Failed to draft story:", draftStoryError)
            throw draftStoryError
          }
        }

        toast.promise(draftProcess, {
          loading: "Drafting story automatically",
          success: "Story drafted!",
          error: "Failed to draft story",
          description: "You can still continue editing the story",
          closeButton: false,
          position: "bottom-center",
        })

        setIsEdited(false)
      }
    },
    1000
  )

  useEffect(() => {
    if (
      value === null ||
      isContentDefault ||
      _.isEqual(value, EMPTY_CONTENT_STRING)
    ) {
      removeContent()
    }
  }, [isContentDefault, removeContent, value])

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
          post={post}
          isEmpty={isEmpty}
          isRetrying={isRetrying}
          saveStatus={saveStatus}
          charsCount={charsCount}
          handleRetry={handleRetry}
          currentTitle={currentTitle}
          allCategories={allCategories}
          postImagesPublicUrls={postImagesPublicUrls}
          isEdited={isEdited && currentTitle !== "Untitled"}
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
