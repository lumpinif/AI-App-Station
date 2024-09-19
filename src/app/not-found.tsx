import { NotFound } from "@/components/layout/not-found"
import BackButton from "@/components/shared/back-button"

export default function NotFoundPage() {
  return (
    <main className="relative flex h-screen flex-col bg-background p-4 md:p-10">
      <div className="px-6">
        <BackButton className="dark:shadow-outline" />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <NotFound />
      </div>
    </main>
  )
}
