"use server"

import createSupabaseServerClient from "@/utils/supabase/server-client"

import { App_Comments, AppCommentWithProfile, Apps } from "@/types/db_tables"
import { getErrorMessage } from "@/lib/handle-error"

// HANDLE COMMNETS
export async function getAppComments(
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

  let { data: comments, error } = await query.returns<AppCommentWithProfile[]>()

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

export async function addAppComment(
  app_id: Apps["app_id"],
  comment_content: App_Comments["comment"],
  replyToCommentId?: App_Comments["parent_id"],
  rating?: App_Comments["rating"]
) {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      comment: null,
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

  return { comment, error }
}

export async function UpdateAppComment(
  app_id: Apps["app_id"],
  comment_content: App_Comments["comment"],
  comment_id: App_Comments["comment_id"],
  rating?: App_Comments["rating"]
) {
  const supabase = await createSupabaseServerClient()

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

  return { updatedComment, error }
}

export async function DeleteAppComment(
  app_id: Apps["app_id"],
  comment_id: App_Comments["comment_id"]
) {
  const supabase = await createSupabaseServerClient()

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

  return { error }
}
