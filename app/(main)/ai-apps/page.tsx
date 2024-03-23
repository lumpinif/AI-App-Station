import { Suspense } from "react"
import { getAllPosts } from "@/server/data/supabase"

import { HeroCarousel } from "./_components/carousel/hero-carousel"

const AIAppsPage = async () => {
  // fetch Posts
  let { posts, error } = await getAllPosts()
  // console.log("🚀 ~ AIAppsPage ~ posts:", posts)

  if (!posts || error) {
    return null
  }

  return (
    <section className="flex flex-col gap-y-4">
      <Suspense fallback={<div>Loading...</div>}>
        <HeroCarousel
          data={posts}
          isMarginRight={false}
          isLoop
          isDotButtons
          isAutoPlay
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <HeroCarousel
          data={posts}
          isMarginRight={false}
          className="md:basis-1/2"
        />
      </Suspense>

      {/* <ContentCarousel className="md:basis-1/2" />
      <ContentCarousel className="md:basis-1/2 lg:basis-1/3" /> */}
    </section>
  )
}

export default AIAppsPage
