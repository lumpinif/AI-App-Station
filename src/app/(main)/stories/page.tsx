import { Metadata } from "next"

import { PageTitle } from "@/components/layout/page-title"

import { SeeAllButton } from "../ai-apps/_components/see-all-button"
import { FeaturedStoriesCarousel } from "./_components/post-carousel/featured-stories-carousel"
import { StoriesCarouselLayout } from "./_components/post-carousel/stories-carousel-layout"
import { StoriesPageTopicNav } from "./_components/topics/stories-page-topic-nav"

export const metadata: Metadata = {
  title: "Discover Stories about AI",
  description:
    "Brilliant stories about AI, written by talented authors and creators.",
}

export default function StoriesPage() {
  return (
    <section className="flex flex-col gap-y-4 md:gap-y-6 lg:gap-y-8">
      <SeeAllButton
        href="/stories/all"
        className="text-sm sm:hidden"
        buttonTitle={"See All Stories"}
      />

      <PageTitle
        href="/stories"
        subtitlePos="bottom"
        title="Browse Stories"
        // className="animate-fade-down"
        subtitle="Discover brilliant stories written by the community"
      >
        <SeeAllButton
          href="/stories/all"
          buttonTitle={"See All Stories"}
          className="hidden sm:flex"
        />
      </PageTitle>

      {/* <Suspense fallback={<LoadingFallback />}> */}
      <FeaturedStoriesCarousel />
      {/* </Suspense> */}

      {/* <Suspense fallback={<LoadingFallback />}> */}
      <StoriesPageTopicNav />
      {/* </Suspense> */}

      {/* <Suspense fallback={<LoadingFallback />}> */}
      <StoriesCarouselLayout />
      {/* </Suspense> */}

      <SeeAllButton
        href="/stories/all"
        className="ml-auto"
        buttonTitle={"See All Stories"}
      />
    </section>
  )
}
