import { Suspense } from "react"
import { getAllApps, getAllHeroFeaturedPosts, getAllPosts } from "@/server/data"
import { EmblaOptionsType } from "embla-carousel"

import AppCardsCarousel from "./_components/carousel/app-card-carousel/app-cards-carousel"
import PostsCarousel from "./_components/carousel/posts-carousel/posts-carousel"

const AIAppsPage = async () => {
  // fetch Posts
  let { posts: heroPosts, error: allHeroFeaturedPostsError } =
    await getAllHeroFeaturedPosts()
  let { posts: allPosts, error: allPostsError } = await getAllPosts()

  let { apps: allApps, error: allAppsError } = await getAllApps()

  if (!allPosts || !heroPosts) {
    return null
  }

  if (!allApps) {
    return null
  }

  const OPTIONS_LOOP: EmblaOptionsType = {
    loop: true,
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

      <Suspense fallback={<div>Loading...</div>}>
        <AppCardsCarousel
          data={allApps}
          className="md:basis-1/2 lg:basis-1/3"
          isMarginRight={true}
        />
      </Suspense>

      {/* <ContentCarousel className="md:basis-1/2" />
      <ContentCarousel className="md:basis-1/2 lg:basis-1/3" /> */}
    </section>
  )
}

export default AIAppsPage
