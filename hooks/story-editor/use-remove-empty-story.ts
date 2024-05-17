import { useCallback } from "react"
import _ from "lodash"
import { JSONContent } from "novel"
import { toast } from "sonner"

import { removeEmptyStoryContent as removeEmptyStoryContentService } from "@/app/(main)/story/_server/data"

interface UseRemoveEmptyStoryProps {
  post_id: string
  post_slug: string
  value: JSONContent
  initialContent: JSONContent
}

const useRemoveEmptyStory = ({
  post_id,
  post_slug,
  value,
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
    if (isContentEmpty(value) || _.isEqual(value, initialContent)) {
      const { error } = await removeEmptyStoryContentService(post_id, post_slug)

      if (error) {
        console.error("Failed to remove empty story", error)
        toast.error("Failed to remove empty story. Please try again later.")
        return null
      }
    }
  }, [post_id, post_slug, value, initialContent, isContentEmpty])

  return { removeEmptyStoryContent }
}

export default useRemoveEmptyStory
