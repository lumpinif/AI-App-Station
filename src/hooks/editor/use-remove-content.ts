import { useCallback } from "react"
import _ from "lodash"
import { JSONContent } from "novel"
import { toast } from "sonner"

import { Profiles } from "@/types/db_tables"
import { removeContentServiceResult } from "@/types/shared"
import {
  defaultEditorContent,
  defaultEditorContentWithoutHeading,
} from "@/config/editor/default-editor-content"
import { EMPTY_CONTENT_STRING } from "@/config/editor/editor-config"

interface UseRemoveContentProps<T, U> {
  content_id: T
  content_slug: U
  value: JSONContent
  profiles?: Profiles
  removeContentService: (
    content_id: T,
    content_slug: U,
    profiles?: Profiles
  ) => Promise<removeContentServiceResult>
}

const useRemoveContent = <T, U>({
  content_id,
  content_slug,
  value,
  profiles,
  removeContentService,
}: UseRemoveContentProps<T, U>) => {
  const isContentEmpty = useCallback((content: JSONContent) => {
    return content === null || _.isEqual(content, EMPTY_CONTENT_STRING)
  }, [])

  const removeContent = useCallback(async () => {
    if (
      isContentEmpty(value) ||
      _.isEqual(value, defaultEditorContent) ||
      _.isEqual(value, defaultEditorContentWithoutHeading)
    ) {
      const { error } = await removeContentService(
        content_id,
        content_slug,
        profiles
      )

      if (error) {
        console.error("Failed to remove content", error)
        toast.error("Failed to remove content. Please try again later.")
        return null
      }
    }
  }, [
    isContentEmpty,
    value,
    removeContentService,
    content_id,
    content_slug,
    profiles,
  ])

  return { removeContent }
}

export default useRemoveContent
