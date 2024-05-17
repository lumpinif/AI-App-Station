import { useCallback, useEffect, useMemo } from "react"
import { JSONContent } from "novel"
import { toast } from "sonner"

import { removeEmptyStoryContent as removeEmptyStoryContentService } from "@/app/(main)/story/_server/data"

interface UseRemoveEmptyStoryProps {
  post_id: string
  post_slug: string
  value: JSONContent
  isStoryEmpty: boolean
  isEmpty: boolean
  initialContent: JSONContent
}

const useRemoveEmptyStory = ({
  post_id,
  post_slug,
  value,
  isStoryEmpty,
  isEmpty,
  initialContent,
}: UseRemoveEmptyStoryProps) => {
  const isContentEmpty = useCallback((content: JSONContent) => {
    return (
      content === null ||
      JSON.stringify(content) ===
        '{"type":"doc","content":[{"type":"paragraph"}]}'
    )
  }, [])

  const removeEmptyStoryContent = useCallback(async () => {
    if (
      value === null ||
      JSON.stringify(value) ===
        '{"type":"doc","content":[{"type":"paragraph"}]}' ||
      JSON.stringify(value) === JSON.stringify(initialContent)
    ) {
      const { error } = await removeEmptyStoryContentService(post_id, post_slug)

      if (error) {
        console.error("Failed to remove empty story", error)
        toast.error("Failed to remove empty story. Please try again later.")
        return null
      }
    }
  }, [post_id, post_slug, value, initialContent])

  useEffect(() => {
    removeEmptyStoryContent()
  }, [value, removeEmptyStoryContent])

  return { removeEmptyStoryContent }
}

export default useRemoveEmptyStory
