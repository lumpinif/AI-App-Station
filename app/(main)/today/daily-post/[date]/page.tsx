import { Suspense } from "react"
import { Metadata } from "next"
import { getUserData } from "@/server/auth"
import { getDailyPost } from "@/server/queries/supabase/stories/fetch_daily_post"
import { JSONContent } from "novel"

import { SearchParams } from "@/types/data-table"
import { Post_Comments } from "@/types/db_tables"
import { siteConfig } from "@/config/site"
import { getSiteUrl } from "@/lib/utils"
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import StoryCommentSection from "@/app/(main)/story/_components/comment/story-comment-section"
import { StoryContentHeroImage } from "@/app/(main)/story/_components/story-content/story-content-hero-image"
import { StoryEditorContent } from "@/app/(main)/story/_components/story-content/story-editor-content"

import { DatePicker } from "../_components/date-picker"
import ScrollToComments from "./scroll-to-comments"

interface DailyPostPageProps {
  params: { date: string }
  searchParams: SearchParams
}

async function fetchDailyPost(params: { date: string }) {
  const { post: dailyPost, error: getDailyPostError } = await getDailyPost(
    params.date
  )

  return { dailyPost, getDailyPostError }
}

export async function generateMetadata({
  params,
  searchParams,
}: DailyPostPageProps): Promise<Metadata> {
  const { dailyPost } = await fetchDailyPost({ date: params.date })

  const post_date = dailyPost?.created_on
  const post_title = dailyPost?.posts.post_title
  const post_thumbnail = dailyPost?.posts.post_image_src
  const post_description = dailyPost?.posts.post_description
  const post_author =
    dailyPost?.posts.profiles.full_name || dailyPost?.posts.profiles.user_name

  if (!dailyPost) {
    return {}
  }

  const ogImage = post_thumbnail || siteConfig.ogImage

  return {
    title: `Daily AI News | ${post_date} | ${post_title}`,
    description: `Written by ${post_author} | ${post_description}`,
    openGraph: {
      title: `Daily AI News | ${post_date} | ${post_title}`,
      description: `Written by ${post_author} | ${post_description}`,
      type: "article",
      url: getSiteUrl() + `/today/daily-post/${post_date}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} | ${post_title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Daily AI News | ${post_date} | ${post_title}`,
      description: `Written by ${post_author} | ${post_description}`,
      images: [ogImage],
      creator: post_author,
    },
  }
}

export default async function DailyPostPage({
  params,
  searchParams,
}: DailyPostPageProps) {
  const c_order = searchParams?.c_order as "asc" | "desc" | undefined
  const orderBy = searchParams?.orderBy as keyof Post_Comments | undefined

  const {
    data: { user },
  } = await getUserData()

  const { dailyPost, getDailyPostError } = await fetchDailyPost({
    date: params.date,
  })

  if (getDailyPostError) {
    return (
      <div>
        Error fetching daily post, please try again. Error:
        {getDailyPostError?.message}
      </div>
    )
  }

  if (!dailyPost) {
    return (
      <div>No daily post found at this time. It should be fixed shortly.</div>
    )
  }

  const { posts: post, created_on } = dailyPost

  return (
    <main>
      <DatePicker
        post_title={post.post_title}
        currentDate={new Date(created_on)}
      />
      <StoryContentHeroImage post_image_src={post.post_image_src} />
      <section className="mx-auto mb-8 flex w-full max-w-4xl flex-col space-y-6 rounded-lg sm:space-y-8 sm:px-6 sm:py-4 md:space-y-10">
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
        <ScrollToComments>
          <Suspense fallback={<LoadingSpinner />}>
            <StoryCommentSection
              user={user}
              c_order={c_order}
              orderBy={orderBy}
              post_id={post.post_id}
            />
          </Suspense>
        </ScrollToComments>
      </section>
    </main>
  )
}
