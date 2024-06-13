import { Fragment } from "react"
import { getPostsByConfig } from "@/server/queries/supabase/stories/posts-fetch-by-config"
import { User } from "@supabase/supabase-js"

import postFetchConfig from "@/config/posts-fetch/posts-fetch-config"
import { Separator } from "@/components/ui/separator"
import PostsCarousel from "@/app/(main)/ai-apps/_components/carousel/posts-carousel/posts-carousel"

const fetchPosts = async () => {
  const results = await Promise.all(
    postFetchConfig.map((config) => getPostsByConfig({ config }))
  )
  return postFetchConfig.map((config, index) => ({
    title: config.title,
    posts: results[index].posts || [],
    error: results[index].getPostsByConfigError || null,
  }))
}

type StoriesCarouselLayoutProps = {
  user?: User | null
  indexToInsert?: number
  children?: React.ReactNode
}

export const StoriesCarouselLayout: React.FC<
  StoriesCarouselLayoutProps
> = async ({ user, indexToInsert, children }) => {
  // Fetch posts data
  const postsData = await fetchPosts()

  return (
    <>
      {postsData.map(({ title, posts, error }, index) => (
        <Fragment>
          <div
            key={index}
            className="relative mx-auto flex h-full w-full max-w-full flex-col gap-y-6"
          >
            {/* Carousel Title */}
            <div className="flex flex-col gap-y-4">
              {/* <Separator /> */}
              <span className="flex flex-col gap-y-2">
                <h2 className="page-title-font text-2xl">{title}</h2>
                <Separator className="bg-input" />
              </span>
            </div>

            <PostsCarousel
              posts={posts}
              title={title}
              error={error}
              isAutpPlay={false}
              isIndicator={true}
              containerCN="h-fit"
              isWheelGestures={true}
              className={
                index % 3 === 0
                  ? ""
                  : index % 3 === 1
                    ? "md:basis-1/2"
                    : "md:basis-1/3"
              }
            />
          </div>
          {index === indexToInsert && children}
        </Fragment>
      ))}
    </>
  )
}
