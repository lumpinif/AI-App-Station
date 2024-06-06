import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getUserData } from "@/server/auth"
import { getAllPosts } from "@/server/data"
import { getAppsWithOrderBy } from "@/server/data/supabase-actions"
import { EmblaOptionsType } from "embla-carousel"

import { OPTIONS_APPSCARDSCAROUSEL } from "@/config/carousels"

import AiAppsPagesTitle from "./_components/ai-apps-page-title"
import AppCardsCarousel from "./_components/carousel/app-card-carousel/app-cards-carousel"
import NewPostsCarousel from "./_components/carousel/posts-carousel/new-posts-carousel"

// Dynamically import the components with 'ssr: false' to prevent them from rendering on the server
// TODO: CHECK IF DYNAMIC IMPORT IS GOOD FOR PERFORMANCE BEFORE PRODUCTION
// const AppCardsCarousel = dynamic(
//   () => import("./_components/carousel/app-card-carousel/app-cards-carousel"),
//   { ssr: true }
// )

const AIAppsMainPage = async () => {
  // Fetch User

  const {
    data: { user },
    error: getUserError,
  } = await getUserData()

  // Fetch posts data
  const { posts: allPosts, error: allPostsError } = await getAllPosts()
  const { posts: heroPosts, error: heroPostsError } = await getAllPosts(true)
  // Fetch apps data
  const { apps: appsWithOrderby, error: appsWithOrderbyError } =
    await getAppsWithOrderBy("likes_count")

  // Handle errors and log them
  if (heroPostsError || allPostsError || appsWithOrderbyError) {
    console.error("Error fetching data:", {
      heroPostsError,
      allPostsError,
      appsWithCategoriesError: appsWithOrderbyError,
    })
    return notFound()
  }

  // Check if data exists
  if (!allPosts || !heroPosts || !appsWithOrderby) {
    return notFound()
  }

  return (
    <section className="flex flex-col gap-y-4">
      <AiAppsPagesTitle />
      <Suspense fallback={<div>Loading...</div>}>
        <NewPostsCarousel
          posts={heroPosts}
          isAutpPlay={true}
          isWheelGestures={true}
          isIndicator={true}
        />
      </Suspense>
      {/* TODO: REBUILD THE CAROUSEL HERE WITH REFINED DATA SOURCE */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* <NewPostsCarousel posts={allPosts} className="md:basis-1/2" /> */}
      </Suspense>
      <div className="mt-4">
        <AppCardsCarousel
          user={user}
          title="Top Paid Apps"
          isMarginRight={true}
          hiddenOnCanNotScroll
          data={appsWithOrderby}
          options={OPTIONS_APPSCARDSCAROUSEL}
          className="md:basis-1/2 lg:basis-1/3"
        />
      </div>
    </section>
  )
}

export default AIAppsMainPage
