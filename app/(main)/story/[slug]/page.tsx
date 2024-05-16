import Image from "next/image"
import { notFound } from "next/navigation"
import { getPost } from "@/server/data"
import supabase from "@/utils/supabase/supabase"

import { Posts } from "@/types/db_tables"
import { nameToSlug } from "@/lib/utils"

import { Story } from "../_components/story/story"

export const dynamicParams = false

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  let { data: allPosts, error } = await supabase
    .from("posts")
    .select("*")
    .returns<Posts[]>()

  if (error) {
    throw new Error(error.message)
  }

  if (!allPosts) {
    return []
  }

  if (allPosts) {
    const storyParams = allPosts.map((post) => ({
      slug: post.post_slug,
    }))
    return storyParams
  }
  return []
}

export default async function StoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const post_slug = nameToSlug(params.slug)

  const { post, error: getPostError } = await getPost(post_slug)

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
