import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getUserData } from "@/server/auth"
import { getAllPosts } from "@/server/data"

import LoadingFallback from "@/components/shared/loading-fallback"

import AiAppsPagesTitle from "./_components/ai-apps-page-title"
import { AppCardsCarouselLayout } from "./_components/ai-apps-page/app-cards-carousel-layout.tsx"
import { MainPageCategoriesNav } from "./_components/ai-apps-page/main-page-categories-nav"
import { MainPageCollectionsNav } from "./_components/ai-apps-page/main-page-collections-nav"
import PostsCarousel from "./_components/carousel/posts-carousel/posts-carousel"

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

const AIAppsMainPage = async () => {
  // Fetch User
  const {
    data: { user },
    error: getUserError,
  } = await getUserData()

  if (getUserError) {
    console.error("Error fetching user data:", {
      getUserError,
    })
  }

  // Fetch posts data
  const { posts: allPosts } = await fetchPosts()
  const { posts: heroPosts } = await fetchPosts({
    is_hero_featured: true,
  })

  return (
    <section className="flex flex-col gap-y-4 sm:my-4 md:my-8 md:gap-y-6 lg:my-10 lg:gap-y-8">
      <AiAppsPagesTitle
        className="sm:mb-2"
        subtitlePos="bottom"
        title="Browse AI Apps"
        subtitle="Discover AI apps submitted by the community"
      />

      {/* Hero Posts Carousel */}
      <PostsCarousel
        posts={heroPosts}
        title="Hero Posts"
        isAutpPlay={true}
        isIndicator={true}
        isWheelGestures={true}
        postCardVariant="hero"
        containerCN="h-[30rem]"
      />

      <MainPageCollectionsNav />

      {/* TODO: UPDATE THE LOADING SKELETON */}
      <Suspense fallback={<LoadingFallback />}>
        <MainPageCategoriesNav />
      </Suspense>

      {/* TODO: UPDATE THE LOADING SKELETON */}
      <Suspense fallback={<LoadingFallback />}>
        <AppCardsCarouselLayout user={user} indexToInsert={2}>
          {/* All Posts Carousel */}
          <PostsCarousel
            posts={allPosts}
            postCardVariant="hero"
            className="md:basis-1/2"
          />
        </AppCardsCarouselLayout>
      </Suspense>
    </section>
  )
}

export default AIAppsMainPage
