import { notFound } from "next/navigation"
import { getPostByPostId } from "@/server/data/stories"
import supabase from "@/utils/supabase/supabase"

import { PostWithProfile } from "@/types/db_tables"

import { Story } from "../../_components/story/story"

export const dynamicParams = false

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  let { data: allPosts, error } = await supabase
    .from("posts")
    .select("*,profiles(*)")
    .returns<PostWithProfile[]>()

  if (error) {
    throw new Error(error.message)
  }

  if (!allPosts) {
    return []
  }

  if (allPosts) {
    const storyParams = allPosts.map((post) => ({
      post_id: `${post.post_id}`,
    }))
    return storyParams
  }
  return []
}

export default async function StoryPage({
  params,
}: {
  params: { post_id: string }
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

  return <Story post={post} />
}
