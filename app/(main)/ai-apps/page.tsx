import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getUserData } from "@/server/auth"
import { getAllPosts } from "@/server/data"
import { getAppsWithOrderBy } from "@/server/data/supabase-actions"
import { getAppsByConfig } from "@/server/queries/supabase/apps"

import { Apps } from "@/types/db_tables"
import appFetchConfig from "@/config/apps-fetch/apps-fetch-config"
import { OPTIONS_APPSCARDSCAROUSEL } from "@/config/carousels"

import AiAppsPagesTitle from "./_components/ai-apps-page-title"
import AppCardsCarousel from "./_components/carousel/app-card-carousel/app-cards-carousel"
import PostsCarousel from "./_components/carousel/posts-carousel/posts-carousel"

// Dynamically import the components with 'ssr: false' to prevent them from rendering on the server
// TODO: CHECK IF DYNAMIC IMPORT IS GOOD FOR PERFORMANCE BEFORE PRODUCTION
// const AppCardsCarousel = dynamic(
//   () => import("./_components/carousel/app-card-carousel/app-cards-carousel"),
//   { ssr: true }
// )

const fetchApps = async () => {
  const results = await Promise.all(
    appFetchConfig.map((config) => getAppsByConfig({ config }))
  )
  return appFetchConfig.map((config, index) => ({
    title: config.title,
    apps: results[index].apps || [],
    error: results[index].getAppsByCategoryError || null,
  }))
}

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

  // Fetch apps data

  // Fetch apps data
  const appsData = await fetchApps()

  return (
    <section className="flex flex-col gap-y-4 sm:my-4 md:my-8 lg:my-10">
      <AiAppsPagesTitle title="Browse AI Apps" />

      {/* Hero Posts Carousel */}
      <PostsCarousel
        posts={heroPosts}
        title="Hero Posts"
        isAutpPlay={true}
        isIndicator={true}
        isWheelGestures={true}
      />

      {appsData.map(({ title, apps, error }, index) => (
        <div key={index} className="mt-4">
          <AppCardsCarousel
            data={apps}
            user={user}
            title={title}
            error={error}
            maxItems={15}
            hiddenOnCanNotScroll
            isMarginRight={true}
            options={OPTIONS_APPSCARDSCAROUSEL}
            className="md:basis-1/2 lg:basis-1/3"
          />
        </div>
      ))}

      {/* All Posts Carousel */}
      {/* <PostsCarousel posts={allPosts} className="md:basis-1/2" /> */}
    </section>
  )
}

export default AIAppsMainPage
