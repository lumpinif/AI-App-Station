"use server"

import { getUserData } from "@/server/auth"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { PostDetails, Posts, PostWithProfile } from "@/types/db_tables"
import { getErrorMessage } from "@/lib/handle-error"

// fetch Posts
export async function getAllPosts(only_is_hero_featured: boolean = false) {
  const supabase = await createSupabaseServerClient()

  const query = supabase
    .from("posts")
    .select(
      "*, categories(*), labels(*), profiles(*), post_likes(*), post_bookmarks(*)"
    )
    // TODO: IMPORTANT - CHECK THE PUBULISH STATUS OF THE POSTS BEFORE PRODUCTION
    .match({ post_publish_status: "published" })
    .order("created_at", { ascending: false })

  if (only_is_hero_featured) {
    query.eq("is_hero_featured", only_is_hero_featured)
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
      `*, categories(*), labels(*), profiles(*), post_likes(*), post_bookmarks(*)`
    )
    .match({ post_id })
    .single<PostDetails>()

  // error handling
  if (error) return { post: null, error: getErrorMessage(error) }

  return { post, error }
}

export async function createNewPost() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
    error: getUserDataError,
  } = await getUserData()

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
