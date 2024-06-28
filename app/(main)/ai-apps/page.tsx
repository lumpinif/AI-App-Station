import { Suspense } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserData } from "@/server/auth"
import { getAllPosts } from "@/server/data"

import LoadingFallback from "@/components/shared/loading-fallback"

import AiAppsPagesTitle from "./_components/ai-apps-page-title"
import { AppCardsCarouselLayout } from "./_components/ai-apps-page/app-cards-carousel-layout.tsx"
import { MainPageCategoriesNav } from "./_components/ai-apps-page/main-page-categories-nav"
import { MainPageCollectionsNav } from "./_components/ai-apps-page/main-page-collections-nav"
import PostsCarousel from "./_components/carousel/posts-carousel/posts-carousel"
import { SeeAllButton } from "./_components/see-all-button"

const fetchPosts = async ({
  is_hero_featured,
}: {
  is_hero_featured?: boolean
} = {}) => {
  const { posts, error: getPostsError } = await getAllPosts({
    is_hero_featured: is_hero_featured,
  })

  if (getPostsError) {
    console.error("Error fetching posts:", {
      getPostsError,
    })
    return notFound()
  }

  if (!posts) {
    return { posts: [] }
  }

  return { posts }
}

export const metadata: Metadata = {
  title: "Discover AI Apps",
  description:
    "Useful AI Apps submitted by talented authors and creators like you. Updated, prospective and active.",
}

const AIAppsMainPage = async () => {
  // Fetch User
  const {
    data: { user },
  } = await getUserData()

  // Fetch posts data
  const { posts: allPosts } = await fetchPosts()
  const { posts: heroPosts } = await fetchPosts({
    is_hero_featured: true,
  })

  return (
    <section className="flex flex-col gap-y-4 sm:my-4 md:my-8 md:gap-y-6 lg:my-10 lg:gap-y-8">
      <AiAppsPagesTitle
        subtitlePos="bottom"
        title="Discover AI Apps"
        // className="animate-fade-up"
        subtitle="Discover AI apps submitted by the community"
      >
        <SeeAllButton
          href="/ai-apps/all"
          buttonTitle={"See All Apps"}
          className="hidden sm:flex"
        />
      </AiAppsPagesTitle>

      {/* Hero Posts Carousel */}
      <PostsCarousel
        posts={heroPosts}
        title="Hero Posts"
        isAutpPlay={true}
        isIndicator={true}
        isWheelGestures={true}
        postCardVariant="hero"
      />

      <MainPageCollectionsNav />

      {/* TODO: UPDATE THE LOADING SKELETON */}
      <Suspense fallback={<LoadingFallback />}>
        <MainPageCategoriesNav />
      </Suspense>

      {/* All Posts Carousel */}
      {/* TODO: UPDATE THE LOADING SKELETON */}
      <Suspense fallback={<LoadingFallback />}>
        <AppCardsCarouselLayout user={user} indexToInsert={2}>
          {/* <PostsCarousel
            posts={allPosts}
            postCardVariant="md:basis-1/2"
            className="md:basis-1/2"
          /> */}
        </AppCardsCarouselLayout>
      </Suspense>

      <SeeAllButton
        href="/ai-apps/all"
        className="ml-auto"
        buttonTitle={"See All Apps"}
      />
    </section>
  )
}

export default AIAppsMainPage
