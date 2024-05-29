import { notFound } from "next/navigation"
import { getPostById } from "@/server/data/stories"
import supabase from "@/utils/supabase/supabase"
import { JSONContent } from "novel"

import { PostDetails } from "@/types/db_tables"
import { getPostAuthorSlug } from "@/lib/utils"

import { StoryEditorContent } from "../../_components/story/story-editor-content"
import { StoryPageProvider } from "../../_components/story/story-page-provider"

// Generate segments for both [user] and [post_id]
export async function generateStaticParams() {
  const { data: allPosts, error } = await supabase
    .from("posts")
    .select("*,profiles(*)")
    .returns<PostDetails[]>()

  if (error) {
    throw new Error("Error fetching data: " + error.message)
  }

  if (allPosts)
    return allPosts.map((post) => ({
      user: getPostAuthorSlug(post.profiles),
      post_id: post.post_id,
    }))

  return []
}

export default async function StoryPage({
  params,
}: {
  params: { user: string; post_id: string }
}) {
  const { post, error: getPostError } = await getPostById(params.post_id)

  if (!post) {
    notFound()
  }

  // TODO: HANDLE THE ERROR BEFORE PRODUCTION
  if (getPostError) {
    console.error(getPostError)
  }

  //TODO: CONSIDER GET USER SESSION HERE

  return (
    <StoryPageProvider>
      <StoryEditorContent
        post_content={post.post_content as JSONContent}
        authorProfile={post.profiles}
        created_at={post.created_at}
      />
    </StoryPageProvider>
  )
}
