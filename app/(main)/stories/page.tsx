import { Suspense } from "react"

import { PageTitle } from "@/components/layout/page-title"
import LoadingFallback from "@/components/shared/loading-fallback"

import { FeaturedStoriesCarousel } from "./_components/post-carousel/featured-stories-carousel"
import { StoriesCarouselLayout } from "./_components/post-carousel/stories-carousel-layout"
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
      <Suspense fallback={<LoadingFallback />}>
        <FeaturedStoriesCarousel />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <StoriesPageTopicNav />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <StoriesCarouselLayout />
      </Suspense>
    </section>
  )
}
