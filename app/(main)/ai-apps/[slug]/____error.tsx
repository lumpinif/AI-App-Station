"use client"

import { useEffect } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { PageTitle } from "@/components/layout/page-title"

// TODO: REBUILD THIS ERROR PAGE TO BE MORE USER FRIENDLY BEFORE PRODUCTION
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
    toast.error(error.message)
  }, [error])

  return (
    <div>
      <PageTitle
        title="Something went wrong"
        className="border-none"
        isBorder={false}
      />

      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}
