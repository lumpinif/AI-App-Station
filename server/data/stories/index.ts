"use server"

import { getUserData } from "@/server/auth"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { PostDetails, Posts, PostWithProfile } from "@/types/db_tables"
import { getErrorMessage } from "@/app/(main)/user/apps/_lib/handle-error"

// fetch Posts
export async function getAllPosts(noHeroFeaturedPosts: boolean = false) {
  const supabase = await createSupabaseServerClient()

  let { data: posts, error } = await supabase
    .from("posts")
    .select("*,profiles(*)")
    // TODO: IMPORTANT - CHECK THE PUBULISH STATUS OF THE POSTS BEFORE
    .eq("post_publish_status", "published")
    .eq("is_hero_featured", noHeroFeaturedPosts)
    .order("created_at", { ascending: false })
    .returns<PostWithProfile[]>()

  // error handling
  if (error) return { posts: null, error: getErrorMessage(error) }

  return { posts, error }
}

export async function getAllHeroFeaturedPosts() {
  const supabase = await createSupabaseServerClient()

  let { data: posts, error } = await supabase
    .from("posts")
    .select("*,profiles(*)")
    .eq("is_hero_featured", true)
    .match({ post_publish_status: "published" })
    .order("created_at", { ascending: false })
    .returns<PostWithProfile[]>()

  // error handling
  if (error) return { posts: null, error: getErrorMessage(error) }

  return { posts, error }
}

export async function getPostByPostId(post_id: Posts["post_id"]) {
  const supabase = await createSupabaseServerClient()

  let { data: post, error } = await supabase
    .from("posts")
    .select(
      `*, categories(*), labels(*), profiles(*), post_likes(*), post_bookmarks(*)`
    )
    .match({ post_publish_status: "published", post_id })
    .single<PostDetails>()

  // error handling
  if (error) return { post: null, error: getErrorMessage(error) }

  return { post, error }
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

export async function createNewStory() {
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
