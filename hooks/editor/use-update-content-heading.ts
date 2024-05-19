import { useCallback, useEffect, useState } from "react"
import _ from "lodash"
import { JSONContent } from "novel"
import { useDebouncedCallback } from "use-debounce"

import { updateContentTitleResult } from "@/types/shared"
import { defaultEditorContent } from "@/config/editor/default-editor-content"

interface UseUpdateContentHeadingProps<T> {
  content: JSONContent
  defaultTitle: string
  updateTitleService: (
    content_id: T,
    title: string
  ) => Promise<updateContentTitleResult>
  content_id: T
}

const useUpdateContentHeading = <T>({
  content,
  defaultTitle,
  updateTitleService,
  content_id,
}: UseUpdateContentHeadingProps<T>) => {
  const [currentTitle, setCurrentTitle] = useState<string>(defaultTitle)

  const getFirstHeading = useCallback((data: JSONContent): string | null => {
    if (
      data.type === "doc" &&
      data.content &&
      data.content[0] &&
      data.content[0].type === "heading" &&
      data.content[0].content &&
      data.content[0].content[0] &&
      data.content[0].content[0].text
    ) {
      return data.content[0].content[0].text
    }
    return null
  }, [])

  const handleDebouncedUpdateTitleService = useDebouncedCallback(
    async (content_id, title: string) => {
      await updateTitleService(content_id, title)
    },
    1000
  )

  useEffect(() => {
    const firstHeading = getFirstHeading(content)
    const defaultFirstHeading = getFirstHeading(defaultEditorContent)

    const isFirstHeadingEmpty = firstHeading === null || firstHeading === ""
    const iSFirstHeadingDefault = _.isEqual(firstHeading, defaultFirstHeading)

    if (isFirstHeadingEmpty || iSFirstHeadingDefault) {
      setCurrentTitle("Untitled")
      handleDebouncedUpdateTitleService(content_id, "Untitled")
    } else if (firstHeading !== currentTitle) {
      setCurrentTitle(firstHeading)
      handleDebouncedUpdateTitleService(content_id, firstHeading)
    }
  }, [
    content,
    currentTitle,
    getFirstHeading,
    content_id,
    handleDebouncedUpdateTitleService,
  ])

  return { currentTitle }
}

export default useUpdateContentHeading
