"use server"

// TODO: MOVE THIS INTO ALL DB_QUERIES FILE SECTIONS
import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { getUserProfile } from "@/server/auth"
import createSupabaseServerClient from "@/utils/supabase/server-client"
import * as z from "zod"

import { PostDetails, PostRefrencedTables, Posts } from "@/types/db_tables"
import { checkIsSuperUser, getPostAuthorSlug } from "@/lib/utils"
import { postsSearchParamsSchema } from "@/lib/validations"

import { deleteFolders } from "../../storage"

type getPostedStoriesProps<T extends PostRefrencedTables> = {
  searchParams: z.infer<typeof postsSearchParamsSchema>
  innerTable?: {
    table: T
  }
}

export async function getPostedStories<T extends PostRefrencedTables>({
  searchParams,
  innerTable,
}: getPostedStoriesProps<T>) {
  noStore()
  const {
    page,
    per_page,
    sort,
    post_title,
    post_publish_status,
    operator,
    from,
    to,
    by_field,
  } = searchParams

  const supabase = await createSupabaseServerClient()

  // get the user profile and check the user role
  const { profile, error: getUserProfileError } = await getUserProfile()

  if (getUserProfileError) {
    console.error("Error loading profile:", getUserProfileError)
    throw new Error(`Failed to fetch user profile: ${getUserProfileError}`)
  }

  // check the user role identity
  const user_id = profile?.user_id
  const user_role = profile?.profile_role?.role
  const isSuperUser = checkIsSuperUser(user_role)

  if (!profile || !profile.user_id) {
    return { posts: [], pageCount: 0, totalPostsCount: 0 }
  }

  const baseFields = [
    "topics",
    "profiles",
    "categories",
    "post_likes",
    "post_bookmarks",
  ]

  let innerT: T
  if (innerTable?.table && isSuperUser) {
    innerT = innerTable.table
    baseFields.push(innerT)
  }

  // TODO: ENSURE THE TYPE SAFETY OF THE by_field
  if (by_field && isSuperUser) baseFields.push(by_field as string)

  const selectFields = ["*"]
    .concat(
      baseFields.map((field) =>
        field === innerT || field === by_field
          ? `${field}!inner(*)`
          : `${field}(*)`
      )
    )
    .join(", ")

  try {
    // Offset to paginate the results
    const offset = (page - 1) * per_page
    // Column and order to sort by
    // Spliting the sort string by "." to get the column and order
    // Example: "title.desc" => ["title", "desc"]
    const [column, order] = (sort?.split(".").filter(Boolean) ?? [
      "created_at",
      "desc",
    ]) as [keyof Posts, "asc" | "desc"]

    // Convert the date strings to Date objects
    const fromDate = from ? new Date(from) : undefined
    const toDate = to ? new Date(to) : undefined

    // Build the filter query based on the search parameters
    const query = supabase
      .from("posts")
      .select(selectFields, { count: "exact" })
      .match({ post_author_id: user_id })
      .order(column, { ascending: order === "asc" })

    // Apply filters based on the search parameters
    if (!operator || operator === "and") {
      if (post_title) query.ilike("post_title", `%${post_title}%`)
      if (post_publish_status)
        query.eq("post_publish_status", post_publish_status)
      if (fromDate && toDate) {
        query.gte("created_at", fromDate.toISOString())
        query.lte("created_at", toDate.toISOString())
      }
    } else if (operator === "or") {
      const orFilters: string[] = []
      if (post_title && post_publish_status) {
        orFilters.push(
          `and(post_title.ilike.%${post_title}%,post_publish_status.eq.${post_publish_status})`
        )
      } else if (post_title) {
        orFilters.push(`post_title.ilike.%${post_title}%`)
      } else if (post_publish_status) {
        orFilters.push(`post_publish_status.eq.${post_publish_status}`)
      }
      if (fromDate && toDate) {
        orFilters.push(
          `created_at.gte.${fromDate.toISOString()},created_at.lte.${toDate.toISOString()}`
        )
      }
      if (orFilters.length > 0) {
        query.or(orFilters.join(","))
      }
    }

    // Apply pagination using the range method
    query.range(offset, offset + per_page - 1)

    // Execute the query and get the results
    const { data: posts, error, count } = await query.returns<PostDetails[]>()

    if (error) {
      throw new Error(`Failed to fetch posted stories: ${error.message}`)
    }

    // Calculate the total page count
    const totalCount = count ? count : 0
    const pageCount = Math.ceil(totalCount / per_page)

    // Get the total count of posts posted by the user
    const { count: totalPostsCount, error: totalPostsCountError } =
      await supabase
        .from("posts")
        .select(selectFields, { count: "exact", head: true })
        .match({ post_author_id: user_id })

    if (totalPostsCountError) {
      throw new Error(
        `Failed to fetch total stories count: ${totalPostsCountError.message}`
      )
    }

    return {
      posts: posts ?? [],
      pageCount,
      totalPostsCount: totalPostsCount ?? 0,
    }
  } catch (error) {
    console.error("Error fetching posted stories:", error)
    return { posts: [], pageCount: 0, totalPostsCount: 0 }
  }
}

export async function deleteStory(
  post_id: Posts["post_id"],
  post_slug: Posts["post_slug"]
) {
  try {
    const supabase = await createSupabaseServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id) return { error: "User not found" }

    const { error } = await supabase.from("posts").delete().match({
      post_id,
      post_author_id: user.id,
    })

    // REMOVE THE STORAGE FILES OF THE STORY
    if (!error) {
      const bucketNameApp =
        process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_STORY!!
      const foldersPath = `${post_slug}/${post_id}/${user.id}`

      // remove the corresponding app storage folders and files
      const { error: deleteFoldersError } = await deleteFolders({
        foldersPath,
        bucketName: bucketNameApp,
      })

      if (deleteFoldersError) {
        console.error("Error deleting folders:", deleteFoldersError)
        // Decide how you want to handle this error. You might want to return it,
        // or perhaps set it in the error variable to be returned at the end of the function.
        return {
          error: `An error occurred while deleting the app.${deleteFoldersError}`,
        }
      }
    }

    revalidatePath(`/`)
    revalidatePath(`/user/stories/${post_id}`)

    return { error: error ?? null } // Return { error: null } if no error occurs
  } catch (error) {
    if (error) {
      console.log(error)
    }
    return { error: "An error occurred while deleting the story." } // Return a generic error message
  }
}
export async function unpublishStory(post_id: Posts["post_id"]) {
  try {
    const supabase = await createSupabaseServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id) return { error: "User not found" }

    const { error } = await supabase
      .from("posts")
      .update({ post_publish_status: "unpublished" })
      .match({
        post_id,
        post_author_id: user.id,
      })

    revalidatePath(`/`)
    revalidatePath(`/user/stories/${post_id}`)

    return { error: error ?? null } // Return { error: null } if no error occurs
  } catch (error) {
    if (error) {
      console.log(error)
    }
    return { error: "An error occurred while unpublishing the story." } // Return a generic error message
  }
}

export async function publishStory(post_id: Posts["post_id"]) {
  try {
    const supabase = await createSupabaseServerClient()
    const { profile } = await getUserProfile()

    if (!profile?.user_id) {
      throw new Error("User session not found")
    }
    const author_slug = getPostAuthorSlug(profile)

    const { error } = await supabase
      .from("posts")
      .update({ post_publish_status: "published" })
      .match({
        post_id,
        post_author_id: profile.user_id,
      })

    revalidatePath(`/`)
    revalidatePath(`/user/stories/${post_id}`)
    revalidatePath(`/story/${author_slug}/${post_id}`)

    return { error: error ?? null } // Return { error: null } if no error occurs
  } catch (error) {
    if (error) {
      console.log(error)
    }
    return { error: "Failed to publish story, please try again later." } // Return a generic error message
  }
}

export async function draftStory(post_id: Posts["post_id"]) {
  try {
    const supabase = await createSupabaseServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.id) {
      throw new Error("Unauthorized!")
    }

    const { error } = await supabase
      .from("posts")
      .update({ post_publish_status: "draft" })
      .match({
        post_id,
        post_author_id: user.id,
      })

    revalidatePath(`/`)
    revalidatePath(`/user/stories/${post_id}`)

    return { error: error ?? null } // Return { error: null } if no error occurs
  } catch (error) {
    if (error) {
      console.log(error)
    }
    return { error: "Failed to draft story, please try again later." } // Return a generic error message
  }
}
