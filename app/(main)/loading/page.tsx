import { LoadingSpinner } from "@/components/shared/loading-spinner"

export default function Page() {
  return (
    <div className="flex h-[calc(100vh-6rem)] w-full items-center justify-center">
      <LoadingSpinner size={30} />
    </div>
  )
}
