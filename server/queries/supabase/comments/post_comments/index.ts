"use server"

import createSupabaseServerClient from "@/utils/supabase/server-client"

import { Post_Comments, PostCommentWithProfile, Posts } from "@/types/db_tables"
import { getErrorMessage } from "@/lib/handle-error"

// HANDLE COMMNETS
export async function getPostComments(
  post_id: Posts["post_id"],
  c_order?: "asc" | "desc",
  orderBy?: keyof Post_Comments
) {
  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from("post_comments")
    .select("*, profiles(*),post_comment_likes(*)")
    .eq("post_id", post_id)

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

  let { data: comments, error } =
    await query.returns<PostCommentWithProfile[]>()

  // Ensure all comments have post_comment_likes as an array
  comments =
    comments?.map((comment) => ({
      ...comment,
      post_comment_likes: comment.post_comment_likes ?? [],
    })) ?? []

  if (error) {
    console.error(error.message)
    return { comments: null, error: getErrorMessage(error) }
  }
  return { comments, error }
}

// THIS IS USED IN THE RETRUN TYPE BECARE FULL WITH MODIFICATIONS
export async function addPostComment(
  post_id: Posts["post_id"],
  comment_content: Post_Comments["comment"],
  replyToCommentId?: Post_Comments["parent_id"],
  rating?: Post_Comments["rating"]
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
    .from("post_comments")
    .insert([
      {
        user_id: user.id,
        comment: comment_content,
        post_id: post_id,
        parent_id: replyToCommentId,
        rating: rating,
      },
    ])
    .eq("post_id", post_id)
    .select("*, profiles(*)")

  if (!comment) return { comment: null, error: "Something went wrong" }

  // error handling
  if (error) return { comment: null, error: getErrorMessage(error) }

  return { comment, error }
}

export async function updatePostComment(
  post_id: Posts["post_id"],
  comment_content: Post_Comments["comment"],
  comment_id: Post_Comments["comment_id"],
  rating?: Post_Comments["rating"]
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
    .from("post_comments")
    .update({
      comment: comment_content,
      rating: rating,
    })
    .match({ comment_id: comment_id, post_id: post_id })
    .select("*, profiles(*)")

  if (!updatedComment)
    return { updatedComment: null, error: "Something went wrong" }

  // error handling
  if (error) return { updatedComment: null, error: getErrorMessage(error) }

  return { updatedComment, error }
}

export async function deletePostComment(
  post_id: Posts["post_id"],
  comment_id: Post_Comments["comment_id"]
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
    .from("post_comments")
    .delete()
    .eq("comment_id", comment_id)
    .eq("post_id", post_id)

  // error handling
  if (error) return { error: getErrorMessage(error) }

  return { error }
}
