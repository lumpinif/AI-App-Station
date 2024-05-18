import { useCallback } from "react"
import _ from "lodash"
import { JSONContent } from "novel"
import { toast } from "sonner"

import { removeContentServiceResult } from "@/types/shared"
import { EMPTY_CONTENT_STRING } from "@/config/editor/editor-config"

interface UseRemoveContentProps<T, U> {
  content_id: T
  content_slug: U
  value: JSONContent
  initialContent: JSONContent
  removeContentService: (
    content_id: T,
    content_slug: U
  ) => Promise<removeContentServiceResult>
}

const useRemoveContent = <T, U>({
  content_id,
  content_slug,
  value,
  initialContent,
  removeContentService,
}: UseRemoveContentProps<T, U>) => {
  const isContentEmpty = useCallback((content: JSONContent) => {
    return (
      content === null || _.isEqual(content, EMPTY_CONTENT_STRING)
      // JSON.stringify(content) === JSON.stringify(EMPTY_CONTENT_STRING)
    )
  }, [])

  const removeContent = useCallback(async () => {
    if (isContentEmpty(value) || _.isEqual(value, initialContent)) {
      const { error } = await removeContentService(content_id, content_slug)

      if (error) {
        console.error("Failed to remove content", error)
        toast.error("Failed to remove content. Please try again later.")
        return null
      }
    }
  }, [
    content_id,
    content_slug,
    value,
    initialContent,
    isContentEmpty,
    removeContentService,
  ])

  return { removeContent }
}

export default useRemoveContent
