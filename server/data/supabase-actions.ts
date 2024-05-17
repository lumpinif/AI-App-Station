"use server"

import { revalidatePath } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import {
  App_Comments,
  AppDetails,
  Apps,
  Categories,
  CommentWithProfile,
  Developers,
  PostDetails,
  Posts,
  PostWithProfile,
} from "@/types/db_tables"
import { capitalizeFirstLetter, nameToSlug } from "@/lib/utils"

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

export async function GetAppByAppIdUserId(
  app_id: Apps["app_id"],
  user_id: Apps["submitted_by_user_id"]
) {
  const supabase = await createSupabaseServerClient()

  if (!user_id) {
    return { app: null, error: "Unauthorized!" }
  }

  let { data: app, error } = await supabase
    .from("apps")
    .select(
      "*,categories(*),profiles(*),developers(*),app_likes(*),app_bookmarks(*)"
    )
    .match({ app_id: app_id, submitted_by_user_id: user_id })
    .limit(1)
    .returns<AppDetails[]>()
  // .eq("app_id", app_id)
  // .eq("submitted_by_user_id", user_id)
  // .single()

  if (!app || app.length === 0) {
    // console.log("App not found for app_slug:", app_slug)
    return { app: null, error: "App not found" }
  }

  // error handling
  if (error) return { app: null, error: getErrorMessage(error) }

  return { app: app[0], error }
}

export async function SubmitApp(title: Apps["app_title"]) {
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
        app_slug: nameToSlug(title),
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
  app_id: Apps["app_id"],
  newTitle: Apps["app_title"]
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
    .select("app_title")
    .eq("app_title", newTitle)

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
    .update({ app_title: newTitle, app_slug: nameToSlug(newTitle) })
    .eq("app_id", app_id)
    .select()

  if (updatedApp) revalidatePath(`/user/apps/${app_id}`)

  if (error) return { updatedApp: null, error: getErrorMessage(error) }

  return { updatedApp, error }
}

export async function UpdateAppByDescription(
  app_id: Apps["app_id"],
  description: Apps["description"]
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

  if (error) return { updatedApp: null, error: getErrorMessage(error) }

  return { updatedApp, error }
}

export async function UpdateAppByUrl(
  app_id: Apps["app_id"],
  app_url: Apps["app_url"]
) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { updatedApp: null, error: "Unauthorized!" }
  }
  if (!app_url) {
    return { updatedApp: null, error: "App url is required." }
  }

  const { data: updatedApp, error } = await supabase
    .from("apps")
    .update({ app_url: app_url })
    .eq("app_id", app_id)
    .select()

  if (updatedApp) revalidatePath(`/user/apps/${app_id}`)

  if (error) return { updatedApp: null, error: getErrorMessage(error) }

  return { updatedApp, error }
}

export async function UpdateAppByPricing(
  app_id: Apps["app_id"],
  pricing: Apps["pricing"]
) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { updatedApp: null, error: "Unauthorized!" }
  }

  const { data: updatedApp, error } = await supabase
    .from("apps")
    .update({ pricing: pricing })
    .eq("app_id", app_id)
    .select()

  if (updatedApp) revalidatePath(`/user/apps/${app_id}`)

  if (error) return { updatedApp: null, error: getErrorMessage(error) }

  return { updatedApp, error }
}

export async function UpdateAppByCopyRight(
  app_id: Apps["app_id"],
  copy_right: Apps["copy_right"]
) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { updatedApp: null, error: "Unauthorized!" }
  }

  const { data: updatedApp, error } = await supabase
    .from("apps")
    .update({ copy_right: copy_right })
    .eq("app_id", app_id)
    .select()

  if (updatedApp) revalidatePath(`/user/apps/${app_id}`)

  if (error) return { updatedApp: null, error: getErrorMessage(error) }

  return { updatedApp, error }
}

// Fetch Apps

export async function getAppBySlug(app_slug: string) {
  const supabase = await createSupabaseServerClient()

  let { data: app, error } = await supabase
    .from("apps")
    .select(
      `*,categories(*),profiles(*),developers(*),app_likes(*),app_bookmarks(*)`
    )
    .match({ app_slug: app_slug, app_publish_status: "published" })
    // .order("created_at", { ascending: false })
    .limit(1)
    .returns<AppDetails[]>()

  // .single<AppDetails>()

  // error handling
  if (error) return { app: null, error: getErrorMessage(error) }

  if (!app || app.length === 0) {
    // console.log("App not found for app_slug:", app_slug)
    return { app: null, error: "App not found" }
  }

  const app_id = app[0].app_id

  // getting app icon url
  // const appIconFileName = await getAppIconFileName(
  //   app_slug,
  //   app[0].submitted_by_user_id
  // )
  // const appIconUrl = await getAppIconUrl(
  //   app_slug,
  //   app[0].submitted_by_user_id,
  //   appIconFileName as string
  // )

  let { data: ratingData, error: ratingError } = await supabase.rpc(
    "get_app_rating_data",
    { app_id_param: app_id }
  )

  if (ratingError) return { error: getErrorMessage(ratingError) }

  if (!ratingData || ratingData.length === 0)
    return { ratingData: null, error: "Rating data not found" }

  return { app: app[0], ratingData: ratingData[0], error }
}

export async function getAllApps(withTable?: string, orderBy?: keyof Apps) {
  const supabase = await createSupabaseServerClient()

  let query = supabase.from("apps").select(`*, ${withTable}`).match({
    app_publish_status: "published",
  })

  if (orderBy) {
    query = query.order(orderBy, { ascending: false })
  }

  let { data: apps, error } = await query

  // error handling
  if (error) return { apps: null, error: getErrorMessage(error) }

  return { apps, error }
}

export async function getAppsWithCatWithOrderBy(orderBy?: keyof Apps) {
  const supabase = await createSupabaseServerClient()

  let query = supabase.from("apps").select(`*, categories(*)`).match({
    app_publish_status: "published",
  })

  if (orderBy) {
    query = query.order(orderBy, { ascending: false })
  }

  let { data: apps, error } = await query

  // error handling
  if (error) return { apps: null, error: getErrorMessage(error) }

  return { apps, error }
}

// HANDLE COMMNETS
export async function getAllComments(
  app_id: Apps["app_id"],
  c_order?: "asc" | "desc",
  orderBy?: keyof App_Comments
) {
  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from("app_comments")
    .select("*, profiles(*),app_comment_likes(*)")
    .eq("app_id", app_id)

  // Conditional additional ordering by another field
  if (!orderBy && !c_order) {
    query = query
      .order("likes_count", {
        ascending: false,
      })
      .order("created_at", { ascending: false })
  } else if (orderBy) {
    query = query
      .order(orderBy, {
        ascending: false,
      })
      .order("created_at", { ascending: false })
  } else {
    query = query.order("created_at", {
      ascending: c_order === "asc",
    })
  }

  let { data: comments, error } = await query.returns<
    CommentWithProfile[] | null
  >()

  // Ensure all comments have app_comment_likes as an array
  comments =
    comments?.map((comment) => ({
      ...comment,
      app_comment_likes: comment.app_comment_likes ?? [],
    })) ?? []

  if (error) {
    console.error(error.message)
    return { comments: null, error: getErrorMessage(error) }
  }
  return { comments, error }
}

// TODO: Refactor OR remove it is Almost Identical to the getInitialComments
export async function getReplies(comment_id: App_Comments["comment_id"]) {
  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from("app_comments")
    .select("*, profiles(*),app_comment_likes(user_id)")
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
  comment_content: App_Comments["comment"],
  app_id: Apps["app_id"],
  replyToCommentId?: App_Comments["parent_id"],
  rating?: App_Comments["rating"]
) {
  const supabase = await createSupabaseServerClient()
  const slug = await getSlugFromAppId(app_id)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      newApp: null,
      error: "You need to login to reply",
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

export async function getSlugFromAppId(app_id: Apps["app_id"]) {
  const supabase = await createSupabaseServerClient()

  let { data: slug, error } = await supabase
    .from("apps")
    .select("app_slug")
    .eq("app_id", app_id)
    .single()

  // TODO: CHECK ERROR HANDLING
  if (error) {
    console.error(error.message)
  }

  if (!slug) {
    console.error("No slug found for app_id: ", app_id)
  }

  return slug
}

export async function UpdateComment(
  comment_content: App_Comments["comment"],
  comment_id: App_Comments["comment_id"],
  app_id: Apps["app_id"],
  rating?: App_Comments["rating"]
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
  comment_id: App_Comments["comment_id"],
  app_id: Apps["app_id"]
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

export async function getAllDevelopers() {
  const supabase = await createSupabaseServerClient()

  let { data: developers, error } = await supabase
    .from("developers")
    .select("developer_name, developer_id,developer_slug")

  // error handling
  if (error) return { error: getErrorMessage(error) }

  return { developers, error }
}

export async function getAllCategories() {
  const supabase = await createSupabaseServerClient()

  let { data: categories, error } = await supabase
    .from("categories")
    .select("*")

  // error handling
  if (error) return { error: getErrorMessage(error) }

  return { categories, error }
}

export async function getCategoryBySlug(
  category_slug: Categories["category_slug"]
) {
  const supabase = await createSupabaseServerClient()

  let { data: category, error } = await supabase
    .from("categories")
    .select("*")
    .eq("category_slug", category_slug)

  // error handling
  if (error) return { error: getErrorMessage(error) }

  return { category, error }
}

export async function insertAppsDevelopers(
  app_id: Apps["app_id"],
  developer_ids: Developers["developer_id"][]
) {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id) {
      throw new Error("User session not found")
    }

    // Check if the app_id is associated with the current user_id
    const { count, error: countError } = await supabase
      .from("apps")
      .select("*", { count: "exact", head: true })
      .eq("app_id", app_id)
      .eq("submitted_by_user_id", user.id)

    if (countError) {
      console.error(
        "Error checking app_id and user_id association:",
        countError
      )
      throw new Error("Failed to check app_id and user_id association")
    }

    if (count === 0) {
      throw new Error(
        "Unauthorized: app_id is not associated with the current user"
      )
    }

    const { data, error } = await supabase.from("apps_developers").insert(
      developer_ids.map((developer_id) => ({
        app_id: app_id,
        developer_id: developer_id,
        submitted_by_user_id: user.id,
      }))
    )

    revalidatePath(`/user/apps/${app_id}`)

    if (error) {
      console.error("Error inserting app-developer associations:", error)
      throw new Error("Failed to insert app-developer associations")
    }

    return data
  } catch (error) {
    console.error("Error in insertAppsDevelopers:", error)
    throw new Error(
      "An error occurred while inserting app-developer associations"
    )
  }
}
export async function insertAppsCategories(
  app_id: Apps["app_id"],
  category_ids: Categories["category_id"][]
) {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id) {
      throw new Error("User not found")
    }

    // Check if the app_id is associated with the current user_id
    const { count, error: countError } = await supabase
      .from("apps")
      .select("*", { count: "exact", head: true })
      .eq("app_id", app_id)
      .eq("submitted_by_user_id", user.id)

    if (countError) {
      console.error(
        "Error checking app_id and user_id association:",
        countError
      )
      throw new Error("Failed to check app_id and user_id association")
    }

    if (count === 0) {
      throw new Error(
        "Unauthorized: app_id is not associated with the current user"
      )
    }

    const { data, error } = await supabase.from("apps_categories").insert(
      category_ids.map((category_id) => ({
        app_id: app_id,
        category_id: category_id,
        submitted_by_user_id: user.id,
      }))
    )

    revalidatePath(`/user/apps/${app_id}`)

    if (error) {
      console.error("Error inserting app-categories associations:", error)
      throw new Error("Failed to insert app-categories associations")
    }

    return data
  } catch (error) {
    console.error("Error in insertAppsCategories:", error)
    throw new Error(
      "An error occurred while inserting app-categories associations"
    )
  }
}

export async function insertDevelopers(
  developers: { label: string; value: string }[]
) {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id) {
    throw new Error("User not found")
  }

  const { data, error } = await supabase
    .from("developers")
    .insert(
      developers.map((developer) => ({
        developer_name: capitalizeFirstLetter(developer.label),
        developer_slug: nameToSlug(developer.value),
        submitted_by_user_id: user.id,
      }))
    )
    .select("developer_id, developer_name")

  if (error) {
    console.error("Error inserting developers:", error)
    throw error
  }

  return data
}
export async function insertCategories(
  categories: { label: string; value: string }[]
) {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id) {
    throw new Error("User not found")
  }

  const { data, error } = await supabase
    .from("categories")
    .insert(
      categories.map((category) => ({
        category_name: capitalizeFirstLetter(category.label),
        category_slug: nameToSlug(category.value),
        submitted_by_user_id: user.id,
      }))
    )
    .select("category_id, category_name")

  if (error) {
    console.error("Error inserting categories:", error)
    throw error
  }

  return data
}

export async function removeAppsDevelopers(
  app_id: Apps["app_id"],
  developer_ids: Developers["developer_id"][]
) {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id) {
      throw new Error("User session not found")
    }

    // Check if the app_id is associated with the current user_id
    const { count, error: countError } = await supabase
      .from("apps")
      .select("*", { count: "exact", head: true })
      .eq("app_id", app_id)
      .eq("submitted_by_user_id", user.id)

    if (countError) {
      console.error(
        "Error checking app_id and user_id association:",
        countError
      )
      throw new Error("Failed to check app_id and user_id association")
    }

    if (count === 0) {
      throw new Error(
        "Unauthorized: app_id is not associated with the current user"
      )
    }

    const { error } = await supabase
      .from("apps_developers")
      .delete()
      .match({ app_id: app_id })
      .in("developer_id", developer_ids)

    revalidatePath(`/user/apps/${app_id}`)

    if (error) {
      console.error("Error removing app-developer associations:", error)
      throw error
    }
  } catch (error) {
    console.error("Error in removeAppsDevelopers:", error)
    throw error
  }
}
export async function removeAppsCategories(
  app_id: Apps["app_id"],
  category_ids: Categories["category_id"][]
) {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id) {
      throw new Error("User not found")
    }

    // Check if the app_id is associated with the current user_id
    const { count, error: countError } = await supabase
      .from("apps")
      .select("*", { count: "exact", head: true })
      .eq("app_id", app_id)
      .eq("submitted_by_user_id", user.id)

    if (countError) {
      console.error(
        "Error checking app_id and user_id association:",
        countError
      )
      throw new Error("Failed to check app_id and user_id association")
    }

    if (count === 0) {
      throw new Error(
        "Unauthorized: app_id is not associated with the current user"
      )
    }

    const { error } = await supabase
      .from("apps_categories")
      .delete()
      .match({ app_id: app_id })
      .in("category_id", category_ids)

    revalidatePath(`/user/apps/${app_id}`)

    if (error) {
      console.error("Error removing app-developer associations:", error)
      throw error
    }
  } catch (error) {
    console.error("Error in removeAppsCategories:", error)
    throw error
  }
}

export async function checkExistingDevelopers(
  developers: { label: string; value: string }[]
) {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from("developers")
    .select("developer_id, developer_slug")
    .in(
      "developer_slug",
      developers.map((d) => d.value)
    )

  if (error) {
    console.error("Error fetching existing developers:", error)
    throw error
  }

  return data
}

export async function checkExistingCategories(
  categories: { label: string; value: string }[]
) {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from("categories")
    .select("category_id, category_slug")
    .in(
      "category_slug",
      categories.map((d) => d.value)
    )

  if (error) {
    console.error("Error fetching existing categories:", error)
    throw error
  }

  return data
}

// DEVELOPERS
export async function UpdateDevByUrlEmail(
  app_id: Apps["app_id"],
  developer_id: Developers["developer_id"],
  developer_url: Developers["developer_url"],
  developer_email: Developers["developer_email"]
) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { updatedDev: null, error: "Unauthorized!" }
  }

  const { data: updatedDev, error } = await supabase
    .from("developers")
    .update({
      developer_url: developer_url,
      developer_email: developer_email || null,
    })
    .eq("developer_id", developer_id)
    .select()

  if (updatedDev) revalidatePath(`/user/apps/${app_id}`)

  if (error) return { updatedDev: null, error: getErrorMessage(error) }

  return { updatedDev, error }
}

// STORAGE

export async function getScreenshotsFileNames(
  app_id: Apps["app_id"],
  app_submitted_by_user_id: Apps["submitted_by_user_id"]
) {
  const supabase = await createSupabaseServerClient()

  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_APP!

  const { data, error } = await supabase.storage
    .from(bucketName)
    .list(`${app_id}/${app_submitted_by_user_id}/screenshots`, {
      limit: 6,
      offset: 0,
      sortBy: { column: "created_at", order: "asc" },
    })

  if (error) {
    console.error("Error message : ", error.message)
    return null
  }

  if (data && data.length > 0) {
    return data?.map((item) => item.name)
  }
  return null
}

export async function getScreenshotsPublicUrls(
  app_id: Apps["app_id"],
  app_submitted_by_user_id: Apps["submitted_by_user_id"],
  fileNames: string[]
) {
  const supabase = await createSupabaseServerClient()
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_APP!
  let screenshotsPublicUrls: string[] = []

  fileNames.map((fileName) => {
    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(
        `${app_id}/${app_submitted_by_user_id}/screenshots/${fileName}`
      )

    if (data) screenshotsPublicUrls.push(data.publicUrl)
  })

  return screenshotsPublicUrls
}

export async function getAppIconFileName(
  app_id: Apps["app_id"],
  app_submitted_by_user_id: Apps["submitted_by_user_id"]
) {
  const supabase = await createSupabaseServerClient()

  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_APP!

  const { data, error } = await supabase.storage
    .from(bucketName)
    .list(`${app_id}/${app_submitted_by_user_id}/icon`, {
      limit: 1,
      offset: 0,
      sortBy: { column: "created_at", order: "asc" },
    })

  if (error) {
    console.error("Error message : ", error.message)
    return null
  }

  if (data && data.length > 0) {
    return data[0].name
  }
  return null
}

export async function getAppIconUrl(
  app_id: Apps["app_id"],
  app_submitted_by_user_id: Apps["submitted_by_user_id"],
  fileName: string
) {
  const supabase = await createSupabaseServerClient()
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_APP!

  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(`${app_id}/${app_submitted_by_user_id}/icon/${fileName}`)

  return data.publicUrl
}

export async function deleteAppIcon(
  app_slug: Apps["app_slug"],
  app_submitted_by_user_id: Apps["submitted_by_user_id"],
  appIconFileName: string
) {
  const supabase = await createSupabaseServerClient()
  try {
    const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_APP!
    const { data, error } = await supabase.storage
      .from(bucketName)
      .remove([
        `${app_slug}/${app_submitted_by_user_id}/icon/${appIconFileName}`,
      ])
    // TODO: ERROR HANDLING
    if (error) {
      console.log(error)
    }
    if (data?.length && data?.length > 0) {
      // remove the record from app_icon_src
      const { error } = await supabase
        .from("apps")
        .update({ app_icon_src: null })
        .eq("app_slug", app_slug)
        .eq("submitted_by_user_id", app_submitted_by_user_id)

      // TODO: ERROR HANDLING
      if (error) {
        console.log(error)
      }
      return true
    } else {
      return false
    }
  } catch (error) {
    if (error) {
      console.log(error)
      return false
    }
    return false
  }
}

export async function deleteScreenshot(
  app_slug: Apps["app_slug"],
  app_submitted_by_user_id: Apps["submitted_by_user_id"],
  screenshotFileName: string
) {
  const supabase = await createSupabaseServerClient()
  try {
    const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_APP!
    const { data, error } = await supabase.storage
      .from(bucketName)
      .remove([
        `${app_slug}/${app_submitted_by_user_id}/screenshots/${screenshotFileName}`,
      ])
    // TODO: ERROR HANDLING
    if (error) {
      console.log(error)
    }
    if (data?.length && data?.length > 0) {
      return true
    } else {
      return false
    }
  } catch (error) {
    if (error) {
      console.log(error)
      return false
    }
    return false
  }
}

// Handle app review submission

// export async function handleAppPubulish(app_id: App["app_id"]) {
//   const supabase = await createSupabaseServerClient()
//   const slug = await getSlugFromAppId(app_id)

//   try {
//     const { error, data } = await supabase
//       .from("apps")
//       .select("ready_to_publish")
//       .eq("app_id", app_id)
//       .single()

//     if (error) {
//       console.error("Error check app review:", error)
//       return { error: error }
//     }

//     if (data.ready_to_publish === false) {
//       const updateResult = await supabase
//         .from("apps")
//         .update({ ready_to_publish: true })
//         .eq("app_id", app_id)

//       if (updateResult.error) {
//         console.error("Error handle app review:", updateResult.error)
//         return { error: updateResult.error }
//       }

//       revalidatePath(`/ai-apps/${slug?.app_slug}`)
//       revalidatePath(`/user/apps/${app_id}`)
//     }

//     return { error }
//   } catch (error) {
//     if (error) {
//       console.log(error)
//     }
//   }
// }
