"use server"

import { error } from "console"
import { revalidatePath } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import {
  App,
  AppDetails,
  Comment,
  CommentWithProfile,
  Profile,
} from "@/types/db_tables"

const getErrorMessage = (error: unknown) => {
  let message: string

  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message)
  } else if (typeof error === "string") {
    message = error
  } else {
    message = "Something went wrong"
  }

  return message
}

// TODO: CHECK ALL THE ERROR HANDLING BEFORE PRODUCTION

export async function GetAppsByUserId(
  app_id: App["app_id"],
  user_id: App["submitted_by_user_id"]
) {
  const supabase = await createSupabaseServerClient()

  if (!user_id) {
    return { app: null, error: "Unauthorized!" }
  }

  let { data: app, error } = await supabase
    .from("apps")
    .select("*")
    .eq("app_id", app_id)
    .eq("submitted_by_user_id", user_id)
    .single()

  return { app, error }
}

export async function SubmitApp(title: App["app_title"]) {
  // TODO: CONSIDER PASSING USER_ID FROM CLIENT BY USING USEUSER HOOK IN ORDER TO CHECK IF USER.ID FROM GETUSER IS SAME AS FROM USEUSER
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      newApp: null,
      error: "You need to login to continue.",
    }
  }

  if (title === null) {
    return { newApp: null, error: "Title is required." }
  }

  // Check if title already exists
  const { data: existingApp, error: existingAppError } = await supabase
    .from("apps")
    .select("app_title")
    .ilike("app_title", title)

  if (existingAppError) {
    return { newApp: null, error: existingAppError }
  }

  if (existingApp && existingApp.length > 0) {
    return { newApp: null, error: "The App already exists. Please try again." }
  }

  const { data: newApp, error } = await supabase
    .from("apps")
    .insert([
      {
        app_title: title,
        submitted_by_user_id: user.id,
        // TODO: REMOVE THIS BEFORE PRODUCTION
        // submitted_by: user.email ?? "",
        // REMOVED: submitted_by_user.email
      },
    ])
    .select("*")

  return { newApp, error }
}

export async function UpdateAppByTitle(
  app_id: App["app_id"],
  newTitle: App["app_title"]
) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { updatedApp: null, error: "Unauthorized!" }
  }
  if (!newTitle) {
    return { updatedApp: null, error: "Title is required." }
  }

  // Check if title already exists with exactly matching case-sensitive comparison
  const { data: existingApp, error: existingAppError } = await supabase
    .from("apps")
    .select("title")
    .eq("title", newTitle)

  if (existingAppError) {
    return { updatedApp: null, error: existingAppError }
  }

  if (existingApp && existingApp.length > 0) {
    return {
      updatedApp: null,
      error: "There exists an app with this name. Please try again.",
    }
  }

  const { data: updatedApp, error } = await supabase
    .from("apps")
    .update({ app_title: newTitle })
    .eq("app_id", app_id)
    .select()

  if (updatedApp) revalidatePath(`/user/apps/${app_id}`)

  // TODO: REMOVE THIE BEFORE PRODUCTION
  if (error) {
    console.log("🚀 ~ Error: Submiting App ~ error:", error)
  }

  return { updatedApp, error }
}

export async function UpdateAppByDescription(
  app_id: App["app_id"],
  description: App["description"]
) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { updatedApp: null, error: "Unauthorized!" }
  }
  if (!description) {
    return { updatedApp: null, error: "Description is required." }
  }

  const { data: updatedApp, error } = await supabase
    .from("apps")
    .update({ description: description })
    .eq("app_id", app_id)
    .select()

  if (updatedApp) revalidatePath(`/user/apps/${app_id}`)

  // TODO: REMOVE THIE BEFORE PRODUCTION
  if (error) {
    console.log("🚀 ~ Error: Submiting App ~ error:", error)
  }

  return { updatedApp, error }
}

// fetch Posts
export async function getAllPosts(noHeroFeaturedPosts: boolean = false) {
  const supabase = await createSupabaseServerClient()

  let { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .eq("hero_featured", noHeroFeaturedPosts)
    .order("created_at", { ascending: false })

  // error handling
  if (error) return { posts: null, error: getErrorMessage(error) }

  return { posts, error }
}

export async function getAllHeroFeaturedPosts() {
  const supabase = await createSupabaseServerClient()

  let { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .eq("hero_featured", true)
    .order("created_at", { ascending: false })

  // error handling
  if (error) return { posts: null, error: getErrorMessage(error) }

  return { posts, error }
}

export async function getPost(slug: string) {
  const supabase = await createSupabaseServerClient()

  let { data: post, error } = await supabase
    .from("posts")
    .select(`*, posts_categories(*), profiles(*)`)
    .eq("slug", slug)
    .eq("published", true)
    .single()

  // error handling
  if (error) return { post: null, error: getErrorMessage(error) }

  return { post, error }
}

// fetch apps

export async function getAppBySlug(app_slug: string) {
  const supabase = await createSupabaseServerClient()

  let { data: app, error } = await supabase
    .from("apps")
    .select(`*,categories(*),profiles(*),developers(*)`)
    .match({ app_slug: app_slug, is_published: true })
    .order("created_at", { ascending: false })
    .single<AppDetails>()

  // error handling
  if (error) return { app: null, error: getErrorMessage(error) }

  if (!app) return { app: null, error: "App not found" }

  let { data: ratingData, error: ratingError } = await supabase.rpc(
    "get_app_rating_data",
    { app_id_param: app.app_id }
  )

  if (ratingError) return { error: getErrorMessage(ratingError) }

  if (!ratingData) return { ratingData: null, error: "Rating data not found" }

  return { app, ratingData: ratingData[0], error }
}

export async function getAllApps() {
  const supabase = await createSupabaseServerClient()

  let { data: apps, error } = await supabase
    .from("apps")
    .select(`*`)
    .order("created_at", { ascending: false })

  // error handling
  if (error) return { apps: null, error: getErrorMessage(error) }

  return { apps, error }
}

export async function getAppsWithCategories() {
  const supabase = await createSupabaseServerClient()

  let { data: apps, error } = await supabase
    .from("apps")
    .select(
      `app_id, app_title, description, app_slug, app_icon_src, categories(*)`
    )
    .order("created_at", { ascending: false })

  // error handling
  if (error) return { apps: null, error: getErrorMessage(error) }

  return { apps, error }
}

export async function getAllComments(app_id: App["app_id"]) {
  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from("app_comments")
    .select("*, profiles(*),comment_likes(user_id)")
    .eq("app_id", app_id)
    .order("created_at", {
      ascending: false,
    })

  let { data: comments, error } = await query.returns<
    CommentWithProfile[] | null
  >()

  if (error) {
    console.error(error.message)
  }
  return { comments, error }
}

export async function getInitialComments(app_id: App["app_id"]) {
  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from("app_comments")
    .select("*, profiles(*),comment_likes(user_id)")
    .eq("app_id", app_id)
    .is("parent_id", null)
    .order("created_at", {
      ascending: false,
    })

  let { data: comments, error } = await query.returns<
    CommentWithProfile[] | null
  >()

  if (error) {
    console.error(error.message)
  }
  return { comments, error }
}

// TODO: Refactor OR remove it is Almost Identical to the getInitialComments
export async function getReplies(comment_id: Comment["comment_id"]) {
  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from("app_comments")
    .select("*, profiles(*),comment_likes(user_id)")
    .eq("parent_id", comment_id)
    .order("created_at", {
      ascending: false,
    })

  let { data: replies, error } = await query.returns<CommentWithProfile[]>()

  if (error) {
    console.error(error.message)
  }
  return { replies, error }
}

export async function AddComment(
  comment_content: Comment["comment"],
  app_id: App["app_id"],
  replyToCommentId?: Comment["parent_id"],
  rating?: Comment["rating"]
) {
  const supabase = await createSupabaseServerClient()
  const slug = await getSlugFromAppId(app_id)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      newApp: null,
      error: "You need to login to reply.",
    }
  }

  let { data: comment, error } = await supabase
    .from("app_comments")
    .insert([
      {
        user_id: user.id,
        comment: comment_content,
        app_id: app_id,
        parent_id: replyToCommentId,
        rating: rating,
      },
    ])
    .eq("app_id", app_id)
    .select("*, profiles(*)")

  if (!comment) return { comment: null, error: "Something went wrong" }

  // error handling
  if (error) return { comment: null, error: getErrorMessage(error) }

  if (comment) revalidatePath(`/ai-apps/${slug?.app_slug}`)

  return { comment, error }
}

export async function getSlugFromAppId(app_id: App["app_id"]) {
  const supabase = await createSupabaseServerClient()

  let { data: slug, error } = await supabase
    .from("apps")
    .select("app_slug")
    .eq("app_id", app_id)
    .single()

  if (error) {
    console.error(error.message)
  }

  if (!slug) {
    console.error("No slug found for app_id: ", app_id)
  }

  return slug
}

export async function UpdateComment(
  comment_content: Comment["comment"],
  comment_id: Comment["comment_id"],
  app_id: App["app_id"],
  rating?: Comment["rating"]
) {
  const supabase = await createSupabaseServerClient()
  const slug = await getSlugFromAppId(app_id)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      updatedComment: null,
      error: "You need to login to update the comment.",
    }
  }

  let { data: updatedComment, error } = await supabase
    .from("app_comments")
    .update({
      comment: comment_content,
      rating: rating,
    })
    .match({ comment_id: comment_id, app_id: app_id })
    .select("*, profiles(*)")

  if (!updatedComment)
    return { updatedComment: null, error: "Something went wrong" }

  // error handling
  if (error) return { updatedComment: null, error: getErrorMessage(error) }

  if (updatedComment) revalidatePath(`/ai-apps/${slug?.app_slug}`)

  return { updatedComment, error }
}

export async function DeleteComment(
  comment_id: Comment["comment_id"],
  app_id: App["app_id"]
) {
  const supabase = await createSupabaseServerClient()
  const slug = await getSlugFromAppId(app_id)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      error: "You need to login to delete the comment.",
    }
  }

  const { error } = await supabase
    .from("app_comments")
    .delete()
    .eq("comment_id", comment_id)
    .eq("app_id", app_id)

  // error handling
  if (error) return { error: getErrorMessage(error) }

  // revalidate the path after successful deletion
  revalidatePath(`/ai-apps/${slug?.app_slug}`)

  return { error }
}
