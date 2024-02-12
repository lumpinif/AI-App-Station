import { LoadingSpinner } from "@/components/layout/loading-spinner"

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  )
}
