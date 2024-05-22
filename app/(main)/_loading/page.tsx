import { Skeleton } from "@/components/ui/skeleton"
import { LoadingSpinner } from "@/components/shared/loading-spinner"

export default function Page() {
  return (
    <main
      className="container mt-4 flex flex-col space-y-4 md:mt-6 md:pl-36 lg:mt-8 xl:mt-12"
      suppressHydrationWarning
    >
      <div className="h-20 w-full sm:h-32 md:hidden">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex flex-col items-start space-y-6 md:space-y-12 lg:space-y-16">
        <div className="flex w-full flex-col items-start space-y-6 md:space-y-12 lg:space-y-16">
          {/* header */}
          <div className="flex w-full items-start space-x-4 md:space-x-8 lg:space-x-14">
            <div className="size-24 flex-none sm:size-32 md:size-40">
              <Skeleton className="h-full w-full rounded-md" />
            </div>
            <div className="flex h-24 w-full flex-col items-start justify-between sm:h-32 md:h-40">
              <div className="flex w-full justify-between">
                <div className="w-full">
                  <Skeleton className="h-6 w-1/3 md:h-8 md:w-1/4" />
                  <Skeleton className="mt-2 h-6 w-full md:mt-4 md:h-12" />
                </div>
                <Skeleton className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div className="flex w-full items-end justify-between pr-4">
                <div className="flex items-center gap-x-2 md:gap-x-6">
                  <Skeleton className="hidden h-8 w-32 sm:block md:h-10 md:w-40" />
                  <div className="flex items-center gap-2 md:gap-4">
                    <Skeleton className="h-6 w-6 md:h-8 md:w-8" />
                    <Skeleton className="h-6 w-6 md:h-8 md:w-8" />
                    <Skeleton className="h-6 w-6 md:h-8 md:w-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* detail info */}
          <Skeleton className="h-24 w-full" />
          {/* mobile launch */}
          <Skeleton className="mx-auto block h-10 w-full max-w-xl sm:hidden" />
        </div>
        <div className="flex w-full flex-col xl:flex-row xl:space-x-4">
          <div className="flex flex-1 flex-col space-y-6 md:space-y-12 lg:space-y-16">
            <Skeleton className="h-6 w-1/3 md:h-10" />
            <div className="grid gap-4 md:grid-cols-3">
              <Skeleton className="h-40 w-full md:h-60" />
              <Skeleton className="hidden h-40 w-full md:block md:h-60" />
              <Skeleton className="hidden h-40 w-full md:block md:h-60" />
            </div>
            <Skeleton className="h-6 w-1/3 md:h-10" />
            <Skeleton className="h-80 w-full" />

            <Skeleton className="h-6 w-1/2 md:h-10" />

            <div className="mt-4 flex items-center justify-between">
              <Skeleton className="h-14 w-[45%] md:h-20" />
              <Skeleton className="h-14 w-[45%] md:h-20" />
            </div>

            <Skeleton className="h-6 w-1/2 md:h-10" />
            <Skeleton className="h-10 w-full md:h-14" />
            <Skeleton className="h-24 w-full md:h-80" />

            <div className="mt-4 flex items-center justify-between">
              <Skeleton className="h-6 w-1/2 md:h-10" />
              <Skeleton className="size-6 md:size-10" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
