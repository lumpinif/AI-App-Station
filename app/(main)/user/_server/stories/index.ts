"use server"

import { revalidatePath } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"
import { JSONContent } from "novel"

import { Posts, Profiles } from "@/types/db_tables"
import { getPostAuthorSlug, nameToSlug } from "@/lib/utils"

// export async function getPostSlugById(post_id: Posts["post_id"]) {
//   const supabase = await createSupabaseServerClient()

//   let { data: post_slug, error } = await supabase
//     .from("posts")
//     .select("post_slug")
//     .match({ post_id })
//     .single()

//   return { post_slug, error }
// }

export async function removeEmptyPostContent(
  post_id: Posts["post_id"],
  post_slug: Posts["post_slug"],
  profiles?: Profiles
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

    revalidatePath(`/story/${getPostAuthorSlug(profiles)}/${post_id}`)
    revalidatePath(`/user/stories/${post_id}`)

    return { error: updateError }
  } catch (error) {
    console.error("Error in removeEmptyStoryContent:", error)
    return { error: error as Error }
  }
}

export async function insertPostContent(
  post_id: Posts["post_id"],
  post_content: Record<string, any>,
  profiles?: Profiles
) {
  const supabase = await createSupabaseServerClient()
  // const { post_slug } = await getPostSlugById(post_id)
  if (!post_id || !post_content) {
    return { error: null }
  }

  try {
    const { error } = await supabase
      .from("posts")
      .update({ post_content: post_content })
      .match({ post_id })

    if (error) {
      console.error("Error inserting story:", error)
      return { error: error }
    }

    revalidatePath(`/story/${getPostAuthorSlug(profiles)}/${post_id}`)
    revalidatePath(`/user/stories/${post_id}`)

    return { error }
  } catch (error) {
    if (error) {
      console.log(error)
    }
  }
}

export async function updatePostTitle(
  post_id: Posts["post_id"],
  post_title: Posts["post_title"],
  profiles?: Profiles
) {
  const supabase = await createSupabaseServerClient()
  // const { post_slug } = await getPostSlugById(post_id)

  if (!post_id || !post_title) {
    return { error: null }
  }

  try {
    const { error } = await supabase
      .from("posts")
      .update({ post_title: post_title, post_slug: nameToSlug(post_title) })
      .match({ post_id })

    if (error) {
      console.error("Error updating title:", error)
      return { error: error }
    }

    revalidatePath(`/story/${getPostAuthorSlug(profiles)}/${post_id}`)
    revalidatePath(`/user/stories/${post_id}`)

    return { error }
  } catch (error) {
    if (error) {
      console.log(error)
    }
  }
}
