import { Suspense } from "react"

import { PageTitle } from "@/components/layout/page-title"
import { LoadingSpinner } from "@/components/shared/loading-spinner"

import { FeaturedStoriesCarousel } from "./_components/post-carousel/featured-stories-carousel"
import { StoriesPageTopicNav } from "./_components/topics/stories-page-topic-nav"

export default function StoriesPage() {
  return (
    <section className="flex flex-col gap-y-4 sm:my-4 md:my-8 md:gap-y-6 lg:my-10 lg:gap-y-8">
      <PageTitle
        href="/stories"
        subtitlePos="bottom"
        title="Browse Stories"
        subtitle="Discover brilliant stories written by the community"
      />
      <Suspense fallback={<LoadingSpinner className="size-4" />}>
        <FeaturedStoriesCarousel />
      </Suspense>

      <Suspense fallback={<LoadingSpinner className="size-4" />}>
        <StoriesPageTopicNav />
      </Suspense>
    </section>
  )
}
