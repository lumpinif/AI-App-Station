"use server"

import { revalidatePath } from "next/cache"
import { getUserProfile } from "@/server/auth"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { Categories, Posts, Topics } from "@/types/db_tables"
import { getErrorMessage } from "@/lib/handle-error"
import {
  capitalizeFirstLetter,
  getPostAuthorSlug,
  nameToSlug,
} from "@/lib/utils"

export async function getAllTopics() {
  const supabase = await createSupabaseServerClient()

  let { data: topics, error } = await supabase
    .from("topics")
    .select("topic_name, topic_id,topic_slug")

  // error handling
  if (error) return { error: getErrorMessage(error) }

  return { topics, error }
}

export async function checkExistingTopics(
  topics: { label: string; value: string }[]
) {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from("topics")
    .select("topic_id, topic_slug")
    .in(
      "topic_slug",
      topics.map((t) => t.value)
    )

  if (error) {
    console.error("Error fetching existing topics:", error)
    throw error
  }

  return data
}

export async function insertTopics(topics: { label: string; value: string }[]) {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id) {
    throw new Error("User not found")
  }

  const { data, error } = await supabase
    .from("topics")
    .insert(
      topics.map((topic) => ({
        topic_name: capitalizeFirstLetter(topic.label),
        topic_slug: nameToSlug(topic.value),
        submitted_by_user_id: user.id,
      }))
    )
    .select("topic_id, topic_name")

  if (error) {
    console.error("Error inserting topics:", error)
    throw error
  }

  return data
}

export async function insertPostTopics(
  post_id: Posts["post_id"],
  topic_ids: Topics["topic_id"][]
) {
  try {
    const supabase = await createSupabaseServerClient()
    const { profile } = await getUserProfile()

    if (!profile?.user_id) {
      throw new Error("User session not found")
    }
    const author_slug = getPostAuthorSlug(profile)

    // Check if the post_id is associated with the current user_id
    const { count, error: countError } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("post_id", post_id)
      .eq("post_author_id", profile.user_id)

    if (countError) {
      console.error(
        "Error checking post_id and user_id association:",
        countError
      )
      throw new Error("Failed to check post_id and user_id association")
    }

    if (count === 0) {
      throw new Error(
        "Unauthorized: post_id is not associated with the current user"
      )
    }

    const { data, error } = await supabase.from("posts_topics").insert(
      topic_ids.map((topic_id) => ({
        post_id: post_id,
        topic_id: topic_id,
        submitted_by_user_id: profile.user_id,
      }))
    )

    revalidatePath("/")
    revalidatePath(`/story/${author_slug}/${post_id}`)

    if (error) {
      console.error("Error inserting posts_topics associations:", error.message)
      throw new Error("Failed to insert posts_topics associations")
    }

    return data
  } catch (error) {
    console.error("Error in insertStoryTopics:", error)
    throw new Error(
      "An error occurred while inserting posts_topics associations"
    )
  }
}

export async function removePostTopics(
  post_id: Posts["post_id"],
  topic_ids: Topics["topic_id"][]
) {
  try {
    const supabase = await createSupabaseServerClient()
    const { profile } = await getUserProfile()

    if (!profile?.user_id) {
      throw new Error("User session not found")
    }
    const author_slug = getPostAuthorSlug(profile)

    // Check if the post_id is associated with the current user_id
    const { count, error: countError } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("post_id", post_id)
      .eq("post_author_id", profile.user_id)

    if (countError) {
      console.error(
        "Error checking post_id and user_id association:",
        countError
      )
      throw new Error("Failed to check post_id and user_id association")
    }

    if (count === 0) {
      throw new Error(
        "Unauthorized: post_id is not associated with the current user"
      )
    }

    const { error } = await supabase
      .from("posts_topics")
      .delete()
      .match({ post_id: post_id })
      .in("topic_id", topic_ids)

    revalidatePath("/")
    revalidatePath(`/story/${author_slug}/${post_id}`)

    if (error) {
      console.error("Error removing posts_topics associations:", error)
      throw error
    }
  } catch (error) {
    console.error("Error in removeStoryTopics:", error)
    throw error
  }
}

export async function updatePostDescription(
  post_id: Posts["post_id"],
  post_description: Posts["post_description"]
) {
  const supabase = await createSupabaseServerClient()
  const { profile } = await getUserProfile()

  if (!profile?.user_id) {
    throw new Error("User session not found")
  }
  const author_slug = getPostAuthorSlug(profile)

  const { data: updatedDescription, error } = await supabase
    .from("posts")
    .update({
      post_description: capitalizeFirstLetter(post_description),
    })
    .match({ post_id: post_id, post_author_id: profile.user_id })
    .select()

  revalidatePath("/")
  revalidatePath(`/story/${author_slug}/${post_id}`)

  if (error) {
    throw new Error("Failed to update post description")
  }

  return { updatedDescription }
}

export async function insertPostCategories(
  post_id: Posts["post_id"],
  category_ids: Categories["category_id"][]
) {
  try {
    const supabase = await createSupabaseServerClient()
    const { profile } = await getUserProfile()

    if (!profile?.user_id) {
      throw new Error("User session not found")
    }
    const author_slug = getPostAuthorSlug(profile)

    // Check if the post_id is associated with the current user_id
    const { count, error: countError } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("post_id", post_id)
      .eq("post_author_id", profile.user_id)

    if (countError) {
      console.error(
        "Error checking post_id and user_id association:",
        countError
      )
      throw new Error("Failed to check post_id and user_id association")
    }

    if (count === 0) {
      throw new Error(
        "Unauthorized: post_id is not associated with the current user"
      )
    }

    const { data, error } = await supabase.from("posts_categories").insert(
      category_ids.map((category_id) => ({
        post_id: post_id,
        category_id: category_id,
        submitted_by_user_id: profile.user_id,
      }))
    )

    revalidatePath("/")
    revalidatePath(`/story/${author_slug}/${post_id}`)

    if (error) {
      console.error(
        "Error inserting posts_categories associations:",
        error.message
      )
      throw new Error("Failed to insert posts_categories associations")
    }

    return data
  } catch (error) {
    console.error("Error in insertStoryCategories:", error)
    throw new Error(
      "An error occurred while inserting posts_categories associations"
    )
  }
}

export async function removePostCategories(
  post_id: Posts["post_id"],
  category_ids: Categories["category_id"][]
) {
  try {
    const supabase = await createSupabaseServerClient()
    const { profile } = await getUserProfile()

    if (!profile?.user_id) {
      throw new Error("User session not found")
    }
    const author_slug = getPostAuthorSlug(profile)

    // Check if the post_id is associated with the current user_id
    const { count, error: countError } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("post_id", post_id)
      .eq("post_author_id", profile.user_id)

    if (countError) {
      console.error(
        "Error checking post_id and user_id association:",
        countError
      )
      throw new Error("Failed to check post_id and user_id association")
    }

    if (count === 0) {
      throw new Error(
        "Unauthorized: post_id is not associated with the current user"
      )
    }

    const { error } = await supabase
      .from("posts_categories")
      .delete()
      .match({ post_id: post_id })
      .in("category_id", category_ids)

    revalidatePath("/")
    revalidatePath(`/story/${author_slug}/${post_id}`)

    if (error) {
      console.error("Error removing posts_categories associations:", error)
      throw error
    }
  } catch (error) {
    console.error("Error in removeStoryCategories:", error)
    throw error
  }
}

export async function getPostImagesFileNames(
  post_id: Posts["post_id"],
  post_author_id: Posts["post_author_id"]
) {
  const supabase = await createSupabaseServerClient()
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_STORY!

  const { data: postImagesFileNames, error: getAllPostImagesError } =
    await supabase.storage
      .from(bucketName)
      .list(`${post_id}/${post_author_id}/story`, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      })

  if (getAllPostImagesError) {
    console.error("Error fetching post images:", getAllPostImagesError)
    throw getAllPostImagesError
  }

  return { postImagesFileNames, getAllPostImagesError }
}

export async function getPostImagesPublicUrls(
  post_id: Posts["post_id"],
  post_author_id: Posts["post_author_id"],
  postImagesFileNames: string[]
) {
  const supabase = await createSupabaseServerClient()
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_STORY!

  const postImagesPublicUrls = await Promise.all(
    postImagesFileNames.map(async (fileName) => {
      const { data: publicUrlData } = await supabase.storage
        .from(bucketName)
        .getPublicUrl(`${post_id}/${post_author_id}/story/${fileName}`)

      if (!publicUrlData) {
        throw new Error(`Failed to get public URL for ${fileName}`)
      }

      return publicUrlData.publicUrl
    })
  )

  return postImagesPublicUrls
}

export async function getPostImagesWithUrls(
  post_id: Posts["post_id"],
  post_author_id: Posts["post_author_id"]
) {
  const supabase = await createSupabaseServerClient()
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_STORY!

  // Fetch file names
  const { data: postImagesFileNames, error: getAllPostImagesError } =
    await supabase.storage
      .from(bucketName)
      .list(`${post_id}/${post_author_id}/story`, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      })

  if (getAllPostImagesError) {
    console.error("Error fetching post images:", getAllPostImagesError)
    throw getAllPostImagesError
  }

  // Fetch public URLs
  const postImagesPublicUrls = await Promise.all(
    postImagesFileNames.map(async (file) => {
      const { name: fileName } = file
      const { data: publicUrlData } = await supabase.storage
        .from(bucketName)
        .getPublicUrl(`${post_id}/${post_author_id}/story/${fileName}`)

      if (!publicUrlData) {
        throw new Error(`Failed to get public URL for ${fileName}`)
      }

      return publicUrlData.publicUrl
    })
  )

  return { postImagesFileNames, postImagesPublicUrls }
}

export async function updatePostImageSrc(
  post_id: Posts["post_id"],
  post_image_src: Posts["post_image_src"]
) {
  const supabase = await createSupabaseServerClient()
  const { profile } = await getUserProfile()

  if (!profile?.user_id) {
    throw new Error("User session not found")
  }
  const author_slug = getPostAuthorSlug(profile)

  const { data: updatedImageSrc, error } = await supabase
    .from("posts")
    .update({
      post_image_src: post_image_src,
    })
    .match({ post_id: post_id, post_author_id: profile.user_id })
    .select()

  revalidatePath("/")
  revalidatePath(`/story/${author_slug}/${post_id}`)

  if (error) {
    throw new Error("Failed to update post image src")
  }

  return { updatedImageSrc }
}
