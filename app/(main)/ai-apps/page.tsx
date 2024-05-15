import { Suspense } from "react"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import { getAllApps, getAllHeroFeaturedPosts, getAllPosts } from "@/server/data"
import { getAppsWithCatWithOrderBy } from "@/server/data/supabase-actions"
import { EmblaOptionsType } from "embla-carousel"

import AiAppsPagesTitle from "./_components/ai-apps-page-title"
import AppCardsCarousel from "./_components/carousel/app-card-carousel/app-cards-carousel"
import NewPostsCarousel from "./_components/carousel/posts-carousel/new-posts-carousel"

// Dynamically import the components with 'ssr: false' to prevent them from rendering on the server
// TODO: CHECK IF DYNAMIC IMPORT IS GOOD FOR PERFORMANCE BEFORE PRODUCTION
// const AppCardsCarousel = dynamic(
//   () => import("./_components/carousel/app-card-carousel/app-cards-carousel"),
//   { ssr: true }
// )

const OPTIONS_APPSCARDSCAROUSEL: EmblaOptionsType = {
  breakpoints: {
    "(min-width: 768px)": { slidesToScroll: 2 },
  },
}

const AIAppsMainPage = async () => {
  try {
    // Fetch posts data
    const { posts: heroPosts, error: heroPostsError } =
      await getAllHeroFeaturedPosts()
    const { posts: allPosts, error: allPostsError } = await getAllPosts()

    // Fetch apps data
    const { apps: allApps, error: allAppsError } =
      await getAllApps("comments_count")
    const { apps: appsWithCategories, error: appsWithCategoriesError } =
      await getAppsWithCatWithOrderBy("likes_count")

    // Handle errors and log them
    if (
      heroPostsError ||
      allPostsError ||
      allAppsError ||
      appsWithCategoriesError
    ) {
      console.error("Error fetching data:", {
        heroPostsError,
        allPostsError,
        allAppsError,
        appsWithCategoriesError,
      })
      return notFound()
    }

    // Check if data exists
    if (!allPosts || !heroPosts || !appsWithCategories || !allApps) {
      return notFound()
    }

    return (
      <section className="flex flex-col gap-y-4">
        <AiAppsPagesTitle />
        <Suspense fallback={<div>Loading...</div>}>
          <NewPostsCarousel
            data={heroPosts}
            isAutpPlay={true}
            isWheelGestures={true}
            isIndicator={true}
          />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <NewPostsCarousel data={allPosts} className="md:basis-1/2" />
        </Suspense>
        <div className="mt-4">
          <AppCardsCarousel
            title="Top Paid Apps"
            data={appsWithCategories}
            className="md:basis-1/2 lg:basis-1/3"
            isMarginRight={true}
            options={OPTIONS_APPSCARDSCAROUSEL}
            hiddenOnCanNotScroll
          />
        </div>
      </section>
    )
  } catch (error) {
    // Catch and log any unexpected errors
    console.error("Unexpected error:", error)
    return notFound()
  }
}

export default AIAppsMainPage
