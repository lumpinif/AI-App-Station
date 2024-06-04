import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getUserData } from "@/server/auth"
import { getPostById } from "@/server/queries/supabase/stories"
import supabase from "@/utils/supabase/supabase"
import { JSONContent } from "novel"

import { SearchParams } from "@/types/data-table"
import { Post_Comments, PostDetails } from "@/types/db_tables"
import { getPostAuthorSlug } from "@/lib/utils"
import { LoadingSpinner } from "@/components/shared/loading-spinner"

import StoryCommentSection from "../../_components/comment/story-comment-section"
import { StoryContentHeroImage } from "../../_components/story-content/story-content-hero-image"
import { StoryEditorContent } from "../../_components/story-content/story-editor-content"
import { StoryEditButton } from "../../_components/story-edit-button"

// Generate segments for both [user] and [post_id]
// export async function generateStaticParams() {
//   const { data: allPosts, error } = await supabase
//     .from("posts")
//     .select("*,profiles(*)")
//     .returns<PostDetails[]>()

//   if (error) {
//     throw new Error("Error fetching data: " + error.message)
//   }

//   if (allPosts)
//     return allPosts.map((post) => ({
//       user: getPostAuthorSlug(post.profiles),
//       post_id: post.post_id,
//     }))

//   return []
// }

export default async function StoryPage({
  params,
  searchParams,
}: {
  params: { user: string; post_id: string }
  searchParams: SearchParams
}) {
  const c_order = searchParams?.c_order as "asc" | "desc" | undefined
  const orderBy = searchParams?.orderBy as keyof Post_Comments | undefined

  const { post, error: getPostError } = await getPostById(params.post_id)
  const {
    data: { user },
    error: getUserError,
  } = await getUserData()

  const isAuthor = post?.post_author_id === user?.id
  const isPublished = post?.post_publish_status === "published"

  if (!post || !(isPublished || isAuthor)) {
    notFound()
  }

  // TODO: HANDLE THE ERROR BEFORE PRODUCTION
  if (getPostError) {
    console.error(getPostError)
  }

  if (getUserError) {
    console.error("Error fetching user data: ", getUserError)
  }

  return (
    <>
      <StoryEditButton
        user={user}
        post_id={post.post_id}
        post_author_id={post.post_author_id}
        post_publish_status={post.post_publish_status}
      />
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
