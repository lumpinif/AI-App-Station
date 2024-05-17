import { useCallback, useEffect, useState } from "react"
import _ from "lodash"
import { JSONContent } from "novel"
import { toast } from "sonner"

import { insertContentServiceResult } from "@/types/shared"

interface UseInsertContentProps<T> {
  content_id: T
  content: JSONContent
  maxRetryAttempts: number
  insertContentService: (
    content_id: T,
    content: JSONContent
  ) => Promise<insertContentServiceResult>
}

const useInsertContent = <T>({
  content_id,
  content,
  maxRetryAttempts,
  insertContentService,
}: UseInsertContentProps<T>) => {
  const [saveStatus, setSaveStatus] = useState<string>("Saved")
  const [isRetrying, setIsRetrying] = useState<boolean>(false)
  const [retryCount, setRetryCount] = useState<number>(0)

  const insertContent = useCallback(
    async (value: JSONContent, isRetry = false) => {
      if (!_.isEqual(content, value) || isRetry) {
        const startTime = Date.now()
        const timeout = 5000 // 5 seconds timeout
        let error = null
        let currentRetryCount = 0

        while (
          Date.now() - startTime < timeout &&
          currentRetryCount < maxRetryAttempts
        ) {
          error = await insertContentService(
            content_id,
            JSON.parse(JSON.stringify(value))
          )

          if (!error?.error) {
            setSaveStatus("Saved")
            setIsRetrying(false)
            setRetryCount(0)
            return
          }

          currentRetryCount += 1
          await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second before retrying
        }

        if (error?.error) {
          toast.error("Failed to save content. Please try again later.")
          setSaveStatus("Failed to save")
          setIsRetrying(false) // Set isRetrying to false when auto-retry fails
          setRetryCount(0) // Reset retryCount to 0

          return null
        }
      }
    },
    [content_id, content, maxRetryAttempts, insertContentService]
  )

  const handleRetry = useCallback(() => {
    if (saveStatus === "Failed to save" && retryCount < maxRetryAttempts) {
      setIsRetrying(true)
      setRetryCount((prevCount) => prevCount + 1)
    }
  }, [saveStatus, retryCount, maxRetryAttempts])

  useEffect(() => {
    if (isRetrying && retryCount < maxRetryAttempts) {
      insertContent(content, true)
    }
  }, [isRetrying, retryCount, maxRetryAttempts, content, insertContent])

  return {
    insertContent,
    saveStatus,
    setSaveStatus,
    isRetrying,
    retryCount,
    handleRetry,
  }
}

export default useInsertContent
