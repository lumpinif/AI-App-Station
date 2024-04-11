import { Suspense } from "react"
import dynamic from "next/dynamic"
import { getAllApps, getAllHeroFeaturedPosts, getAllPosts } from "@/server/data"
import { getAppsWithCategories } from "@/server/data/supabase"
import { EmblaOptionsType } from "embla-carousel"

// Dynamically import the components with 'ssr: false' to prevent them from rendering on the server
const AppCardsCarousel = dynamic(
  () => import("./_components/carousel/app-card-carousel/app-cards-carousel"),
  { ssr: true }
)

const PostsCarousel = dynamic(
  () => import("./_components/carousel/posts-carousel/posts-carousel"),
  { ssr: true }
)

const OPTIONS_LOOP: EmblaOptionsType = {
  loop: true,
}

const OPTIONS_APPSCARDSCAROUSEL: EmblaOptionsType = {
  breakpoints: {
    "(min-width: 768px)": { slidesToScroll: 2 },
  },
}

const AIAppsPage = async () => {
  // fetch Posts
  let { posts: heroPosts, error: allHeroFeaturedPostsError } =
    await getAllHeroFeaturedPosts()
  let { posts: allPosts, error: allPostsError } = await getAllPosts()
  //TODO: ERROR HANDLING FOR NO POST FOUND
  // fetch Apps
  let { apps: allApps, error: allAppsError } = await getAllApps()
  let { apps: AppsWithCategories, error: AppsWithCategoriesError } =
    await getAppsWithCategories()

  //TODO: ERROR HANDLING FOR NO APP FOUND

  if (!allPosts || !heroPosts || !AppsWithCategories || !allApps) {
    return null
  }

  return (
    <section className="flex flex-col gap-y-4">
      <Suspense fallback={<div>Loading...</div>}>
        <PostsCarousel
          data={heroPosts}
          options={OPTIONS_LOOP}
          isAutpPlay={true}
          isMarginRight={false}
        />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <PostsCarousel
          data={allPosts}
          className="md:basis-1/2"
          isMarginRight={false}
        />
      </Suspense>
      {/* <div className="mt-4">
        <AppCardsCarousel
          // TODO: CONSIDERING REFACTOR TITLE INTO CONFIG
          title={"Top Free Apps"}
          data={allApps}
          className="md:basis-1/2 lg:basis-1/3"
          isMarginRight={true}
          options={OPTIONS_APPSCARDSCAROUSEL}
          hiddenOnCanNotScroll
        />
      </div> */}
      <div className="mt-4">
        <AppCardsCarousel
          // TODO: CONSIDERING REFACTOR TITLE INTO CONFIG
          title={"Top Paid Apps"}
          data={AppsWithCategories}
          className="md:basis-1/2 lg:basis-1/3"
          isMarginRight={true}
          options={OPTIONS_APPSCARDSCAROUSEL}
          hiddenOnCanNotScroll
        />
      </div>
    </section>
  )
}

export default AIAppsPage
