import { Suspense } from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getUserData } from "@/server/auth"
import { getPostById } from "@/server/queries/supabase/stories"
import { JSONContent } from "novel"

import { SearchParams } from "@/types/data-table"
import { Post_Comments } from "@/types/db_tables"
import { siteConfig } from "@/config/site"
import { getPostAuthorSlug, getSiteUrl } from "@/lib/utils"
import { LoadingSpinner } from "@/components/shared/loading-spinner"

import StoryCommentSection from "../../_components/comment/story-comment-section"
import { StoryContentHeroImage } from "../../_components/story-content/story-content-hero-image"
import { StoryEditorContent } from "../../_components/story-content/story-editor-content"

interface StoryPageProps {
  params: { user: string; post_id: string }
  searchParams: SearchParams
}

async function fetchPostById(params: { post_id: string }) {
  const { post, error: getPostError } = await getPostById(params.post_id)

  return { post, getPostError }
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { post } = await fetchPostById({ post_id: params.post_id })

  const post_id = post?.post_id
  const post_title = post?.post_title
  const post_description = post?.post_description
  const post_thumbnail = post?.post_image_src
  const post_author = post?.profiles.full_name || post?.profiles.user_name
  const author_slug = params.user || getPostAuthorSlug(post?.profiles)
  const post_topics = post?.topics?.map((topic) => topic.topic_name).join(", ")

  if (!post) {
    return {}
  }

  const ogImage = post_thumbnail || siteConfig.ogImage

  return {
    title: `${post_title} - ${post_author}`,
    description: `Written by ${post_author} | ${post_description} | Topics: ${post_topics}`,
    openGraph: {
      title: `${post_title} - ${post_author}`,
      description: `Written by ${post_author} | ${post_description} | Topics: ${post_topics}`,
      type: "article",
      url: getSiteUrl() + `/${author_slug}/${post_id}`,
      images: [
        {
          url: ogImage,
          width: 1400,
          height: 800,
          alt: `${siteConfig.name} | ${post_title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post_title} - ${post_author}`,
      description: `Written by ${post_author} | ${post_description}`,
      images: [ogImage],
      creator: post_author,
    },
  }
}

export default async function StoryPage({
  params,
  searchParams,
}: StoryPageProps) {
  const c_order = searchParams?.c_order as "asc" | "desc" | undefined
  const orderBy = searchParams?.orderBy as keyof Post_Comments | undefined

  const { post, getPostError } = await fetchPostById({
    post_id: params.post_id,
  })

  const {
    data: { user },
  } = await getUserData()

  const isAuthor = post?.post_author_id === user?.id
  const isPublished = post?.post_publish_status === "published"

  if (!post || !(isPublished || isAuthor)) {
    notFound()
  }

  // TODO: HANDLE THE ERROR
  if (getPostError) {
    console.error(getPostError)
    return (
      <div className="flex flex-col text-muted-foreground">
        <p>Error getting this post: {getPostError}</p>
        <p>Please try again</p>
      </div>
    )
  }

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
