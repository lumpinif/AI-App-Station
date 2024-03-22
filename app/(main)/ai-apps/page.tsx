import { Suspense } from "react"
import { getAllPosts } from "@/server/data/supabase"
import { toast } from "sonner"

import ContentCarousel from "./_components/carousel/content-carousel"

const AIAppsPage = async () => {
  // fetch Posts
  // const { posts, error } = await getAllPosts()

  // if (error) {
  //   toast.error(`Error loading the post! Please try again later.`)
  // }

  // if (!posts) {
  //   return null
  // }

  return (
    <section className="">
      {/* <Suspense>
        <ContentCarousel isLoop noMarginRight data={posts} />
      </Suspense> */}
      {/* <ContentCarousel className="md:basis-1/2" />
      <ContentCarousel className="md:basis-1/2 lg:basis-1/3" /> */}
    </section>
  )
}

export default AIAppsPage

{
  /* <Card>
                <CardContent className="flex h-56 items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card> */
}
