import { Suspense } from "react"
import dynamic from "next/dynamic"
import { getAllApps, getAllHeroFeaturedPosts, getAllPosts } from "@/server/data"
import { getAppsWithCatWithOrderBy } from "@/server/data/supabase-actions"
import { EmblaOptionsType } from "embla-carousel"

import AiAppsPagesTitle from "./_components/ai-apps-page-title"
import NewPostsCarousel from "./_components/carousel/posts-carousel/new-posts-carousel"

// Dynamically import the components with 'ssr: false' to prevent them from rendering on the server
// TODO: CHECK IF DYNAMIC IMPORT IS GOOD FOR PERFORMANCE BEFORE PRODUCTION
const AppCardsCarousel = dynamic(
  () => import("./_components/carousel/app-card-carousel/app-cards-carousel"),
  { ssr: true }
)

const OPTIONS_APPSCARDSCAROUSEL: EmblaOptionsType = {
  breakpoints: {
    "(min-width: 768px)": { slidesToScroll: 2 },
  },
}

const AIAppsMainPage = async () => {
  // fetch Posts
  let { posts: heroPosts, error: allHeroFeaturedPostsError } =
    await getAllHeroFeaturedPosts()

  let { posts: allPosts, error: allPostsError } = await getAllPosts()
  //TODO: ERROR HANDLING FOR NO POST FOUND
  // fetch Apps
  let { apps: allApps, error: allAppsError } =
    await getAllApps("comments_count")

  let { apps: AppsWithCategories, error: AppsWithCategoriesError } =
    await getAppsWithCatWithOrderBy("likes_count")

  //TODO: ERROR HANDLING FOR NO APP FOUND

  if (allAppsError || allHeroFeaturedPostsError || allPostsError) {
    console.error(
      allAppsError,
      allHeroFeaturedPostsError,
      allPostsError,
      AppsWithCategoriesError
    )
  }

  if (!allPosts || !heroPosts || !AppsWithCategories || !allApps) {
    return null
  }

  //TODO:HADNDLING LOADING SKELETON
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
          // TODO: CONSIDERING REFACTOR TITLE INTO CONFIG
          title={"Top Paid Apps"}
          data={AppsWithCategories}
          // isAutpPlay={true}
          className="md:basis-1/2 lg:basis-1/3"
          isMarginRight={true}
          options={OPTIONS_APPSCARDSCAROUSEL}
          hiddenOnCanNotScroll
        />
      </div>
    </section>
  )
}

export default AIAppsMainPage
