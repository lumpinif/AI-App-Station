import { cn } from "@/lib/utils"

import { LoadingSpinner } from "./loading-spinner"

const LoadingFallback = ({ className }: { className?: string }) => {
  return (
    <span className="flex w-full items-center justify-center">
      <LoadingSpinner className={cn("size-4", className)} />
    </span>
  )
}

export default LoadingFallback
