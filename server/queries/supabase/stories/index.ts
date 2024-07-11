"use server"

import { unstable_noStore as noStore } from "next/cache"
import { getUser } from "@/server/auth"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { PostDetails, Posts, PostWithProfile, Topics } from "@/types/db_tables"
import { getErrorMessage } from "@/lib/handle-error"

type getAllPostsProps = {
  orderBy?: keyof Posts
  is_hero_featured?: boolean
}

// fetch Posts
export async function getAllPosts(
  { orderBy, is_hero_featured }: getAllPostsProps = { orderBy: "views_count" }
) {
  noStore()
  const supabase = await createSupabaseServerClient()

  const query = supabase
    .from("posts")
    .select(
      "*, categories(*), topics(*), profiles(*), post_likes(*), post_bookmarks(*)"
    )
    .match({ post_publish_status: "published" })

  if (is_hero_featured) {
    query.eq("is_hero_featured", is_hero_featured)
  }

  if (orderBy) {
    query.order(orderBy, { ascending: false })
  }

  // TODO: CHECK THE TYPES OF RETURNS IF IT IS TOO HEAVY AND NECESSARY
  let { data: posts, error } = await query.returns<PostDetails[]>()

  // error handling
  if (error) return { posts: null, error: getErrorMessage(error) }

  return { posts, error }
}

export async function getPostById(post_id: Posts["post_id"]) {
  const supabase = await createSupabaseServerClient()

  let { data: post, error } = await supabase
    .from("posts")
    .select(
      `*, categories(*), topics(*), profiles(*,profile_role(*)), post_likes(*), post_bookmarks(*),daily_post(*),post_of_the_day(*)`
    )
    .match({ post_id })
    .single<PostDetails>()

  // error handling
  if (error) return { post: null, error: getErrorMessage(error) }

  return { post, error }
}

export async function createNewPost() {
  const supabase = await createSupabaseServerClient()

  const { user, error: getUserDataError } = await getUser()

  if (!user || !user?.id) {
    return { error: new Error("User not found") }
  }

  if (getUserDataError) {
    return { error: getUserDataError }
  }

  const { data: newStory, error } = await supabase
    .from("posts")
    .insert([{ post_author_id: user?.id }])
    .select("*,profiles(*)")
    .single<PostWithProfile>()

  return { newStory, error }
}

export async function getAllTopics() {
  const supabase = await createSupabaseServerClient()

  let { data: topics, error } = await supabase.from("topics").select("*")

  // error handling
  if (error) return { error: getErrorMessage(error) }

  return { topics, error }
}

export async function getTopicBySlug(topic_slug: Topics["topic_slug"]) {
  const supabase = await createSupabaseServerClient()

  let { data: topic, error } = await supabase
    .from("topics")
    .select("*")
    .eq("topic_slug", topic_slug)

  // error handling
  if (error) return { error: getErrorMessage(error) }

  return { topic, error }
}

export async function getPostByTopicSlug(topic_slug: Topics["topic_slug"]) {
  const supabase = await createSupabaseServerClient()

  let { data: posts, error } = await supabase
    .from("posts")
    .select(
      `*, categories(*), topics!inner(*), profiles(*), post_likes(*), post_bookmarks(*)`
    )
    .eq("post_publish_status", "published")
    .eq("topics.topic_slug", topic_slug)
    .order("likes_count", { ascending: false })
    .returns<PostDetails[]>()

  // error handling
  if (error) return { posts: null, error: getErrorMessage(error) }

  return { posts, error }
}
