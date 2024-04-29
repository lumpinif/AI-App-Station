import { NotFound } from "@/components/layout/not-found"
import BackButton from "@/components/shared/back-button"

export default function NotFoundPage() {
  return (
    <main className="relative flex h-[calc(100vh-12rem)] flex-col">
      <div className="absolute inset-0 px-6">
        <BackButton className="dark:shadow-outline" />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <NotFound />
      </div>
    </main>
  )
}
