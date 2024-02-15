import { NotFound } from "@/components/layout/not-found"
import BackButton from "@/components/shared/back-button"

export default function NotFoundPage() {
  return (
    <>
      <div className="flex h-dvh flex-col">
        <div className="px-6">
          <BackButton className="dark:shadow-outline" />
        </div>
        <div className="-mt-24 flex h-full flex-1 items-center justify-center">
          <NotFound />
        </div>
      </div>
    </>
  )
}
