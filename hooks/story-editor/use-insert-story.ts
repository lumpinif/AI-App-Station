import { useCallback, useEffect, useState } from "react"
import { JSONContent } from "novel"
import { toast } from "sonner"

import { insertStory as insertStoryService } from "@/app/(main)/story/_server/data"

interface UseInsertStoryProps {
  post_id: string
  post_content: JSONContent
  maxRetryAttempts: number
}

const useInsertStory = ({
  post_id,
  post_content,
  maxRetryAttempts,
}: UseInsertStoryProps) => {
  const [saveStatus, setSaveStatus] = useState<string>("Saved")
  const [isRetrying, setIsRetrying] = useState<boolean>(false)
  const [retryCount, setRetryCount] = useState<number>(0)

  const insertStory = useCallback(
    async (value: JSONContent, isRetry = false) => {
      if (post_content !== value || isRetry) {
        const startTime = Date.now()
        const timeout = 5000 // 5 seconds timeout
        let error = null
        let currentRetryCount = 0

        while (
          Date.now() - startTime < timeout &&
          currentRetryCount < maxRetryAttempts
        ) {
          error = await insertStoryService(
            post_id,
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
          toast.error("Failed to save story. Please try again later.")
          setSaveStatus("Failed to save")
          setIsRetrying(false) // Set isRetrying to false when auto-retry fails
          setRetryCount(0) // Reset retryCount to 0

          return null
        }
      }
    },
    [post_id, post_content, maxRetryAttempts]
  )

  const handleRetry = useCallback(() => {
    if (saveStatus === "Failed to save" && retryCount < maxRetryAttempts) {
      setIsRetrying(true)
      setRetryCount((prevCount) => prevCount + 1)
    }
  }, [saveStatus, retryCount, maxRetryAttempts])

  useEffect(() => {
    if (isRetrying && retryCount < maxRetryAttempts) {
      insertStory(post_content, true)
    }
  }, [isRetrying, retryCount, maxRetryAttempts, post_content, insertStory])

  return {
    insertStory,
    saveStatus,
    setSaveStatus,
    isRetrying,
    retryCount,
    handleRetry,
  }
}

export default useInsertStory
