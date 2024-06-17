import { LoadingSpinner } from "@/components/shared/loading-spinner"

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-12rem)] w-full items-center justify-center">
      <LoadingSpinner size={30} />
    </div>
  )
}
