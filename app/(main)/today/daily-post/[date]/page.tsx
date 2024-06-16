import { Suspense } from "react"
import { getUserData } from "@/server/auth"
import { getDailyPost } from "@/server/queries/supabase/stories/fetch_daily_post"
import { JSONContent } from "novel"

import { SearchParams } from "@/types/data-table"
import { Post_Comments } from "@/types/db_tables"
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import StoryCommentSection from "@/app/(main)/story/_components/comment/story-comment-section"
import { StoryContentHeroImage } from "@/app/(main)/story/_components/story-content/story-content-hero-image"
import { StoryEditorContent } from "@/app/(main)/story/_components/story-content/story-editor-content"

export default async function DailyPostPagePage({
  params,
  searchParams,
}: {
  params: { date: string }
  searchParams: SearchParams
}) {
  const c_order = searchParams?.c_order as "asc" | "desc" | undefined
  const orderBy = searchParams?.orderBy as keyof Post_Comments | undefined

  const { post: dailyPost, error: getDailyPostError } = await getDailyPost(
    params.date
  )

  const {
    data: { user },
    error: getUserError,
  } = await getUserData()

  if (getDailyPostError || getUserError) {
    return <div>Error fetching daily post, please try again.</div>
  }

  if (!dailyPost) {
    return (
      <div>No daily post found at this time. It should be fixed shortly.</div>
    )
  }

  const { posts: post } = dailyPost

  return (
    <>
      <StoryContentHeroImage post_image_src={post.post_image_src} />
      <main className="mx-auto mb-8 flex w-full max-w-4xl flex-col space-y-6 rounded-lg sm:space-y-8 sm:px-6 sm:py-4 md:space-y-10">
        <StoryEditorContent
          {...post}
          user={user}
          authorProfile={post.profiles}
          postCategories={post.categories}
          post_content={post.post_content as JSONContent}
        />
        <div className="flex w-full items-center justify-center text-sm text-border">
          - end of the story -
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          <StoryCommentSection
            user={user}
            c_order={c_order}
            orderBy={orderBy}
            post_id={post.post_id}
          />
        </Suspense>
      </main>
    </>
  )
}
