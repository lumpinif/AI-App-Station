"use server"

import { revalidatePath } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { Posts, Profiles } from "@/types/db_tables"

export async function getAuthorProfileById(
  post_author_id: Posts["post_author_id"]
) {
  const supabase = await createSupabaseServerClient()

  const { data: authorProfile, error: getAuthorProfileError } = await supabase
    .from("profiles")
    .select("*")
    .match({ user_id: post_author_id })
    .single<Profiles>()

  if (getAuthorProfileError) {
    console.error("Error getting author profile:", getAuthorProfileError)
    return {
      error: {
        message: "An error occurred while getting the author profile.",
        details: getAuthorProfileError.message,
      },
    }
  }

  if (!authorProfile) {
    return {
      data: null,
      getAuthorProfileError: { message: "Author profile not found." },
    }
  }

  return { authorProfile }
}

export async function removeEmptyStoryContent(
  post_id: Posts["post_id"],
  post_slug: Posts["post_slug"]
) {
  const supabase = await createSupabaseServerClient()

  if (!post_id && !post_slug) {
    return { error: null }
  }

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return { error: userError || new Error("User not found") }
    }

    const { error: updateError } = await supabase
      .from("posts")
      .update({ post_content: null })
      .match({ post_id: post_id, post_author_id: user.id })

    if (updateError) {
      console.error("Error deleting strory content:", updateError)
      return { error: updateError }
    }

    // TODO: CHECK THE REVALIDATE PATHS BEFORE PRODUCTION CONSIDER USE AUTHOR ID TO GET THE PROFILE NAME FOR THE ROUTE SEGEMENT
    revalidatePath(`/story/${user.id}/${post_slug}`)
    revalidatePath(`/user/posts/${post_id}`)

    return { error: null }
  } catch (error) {
    console.error("Error in removeEmptyStoryContent:", error)
    return { error: error as Error }
  }
}

export async function insertStory(
  post_id: Posts["post_id"],
  post_content: Record<string, any>
) {
  const supabase = await createSupabaseServerClient()
  // const slug = await getSlugFromAppId(app_id)

  if (!post_id || !post_content) {
    return { error: null }
  }

  try {
    const { error } = await supabase
      .from("posts")
      .update({ post_content: post_content })
      .eq("post_id", post_id)

    if (error) {
      console.error("Error inserting story:", error)
      return { error: error }
    }

    // TODO: CHECK THE REVALIDATE PATHS BEFORE PRODUCTION
    // revalidatePath(`/ai-apps/${slug?.app_slug}`)
    // revalidatePath(`/user/apps/${app_id}`)

    return { error }
  } catch (error) {
    if (error) {
      console.log(error)
    }
  }
}
