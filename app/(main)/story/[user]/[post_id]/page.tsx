import { notFound } from "next/navigation"
import { getPostByPostId } from "@/server/data/stories"
import supabase from "@/utils/supabase/supabase"

import { PostDetails } from "@/types/db_tables"
import { nameToSlug } from "@/lib/utils"

import { Story } from "../../_components/story/story"

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
      user: nameToSlug(post.profiles.full_name ?? post.profiles.email),
      post_id: post.post_id,
    }))

  return []
}

export default async function StoryPage({
  params,
}: {
  params: { user: string; post_id: string }
}) {
  const { post, error: getPostError } = await getPostByPostId(params.post_id)

  if (!post) {
    notFound()
  }

  // TODO: HANDLE THE ERROR BEFORE PRODUCTION
  if (getPostError) {
    console.error(getPostError)
  }

  //TODO: CONSIDER GET USER SESSION HERE

  return (
    <>
      <Story post={post} />
    </>
  )
}
