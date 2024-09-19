import { notFound } from "next/navigation"
import { getAllPosts } from "@/server/queries/supabase/stories"

import PostsCarousel from "@/app/(main)/ai-apps/_components/carousel/posts-carousel/posts-carousel"

type FeaturedStoriesCarouselProps = {
  className?: string
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

export const FeaturedStoriesCarousel: React.FC<
  FeaturedStoriesCarouselProps
> = async ({ className }) => {
  const { posts: heroPosts } = await fetchPosts({
    is_hero_featured: true,
  })

  return (
    <>
      <PostsCarousel
        posts={heroPosts}
        isAutpPlay={false}
        isIndicator={true}
        isWheelGestures={true}
        containerCN="h-fit"
        className={className}
        postCardVariant="hero"
        title="Featured Stories"
      />
    </>
  )
}
