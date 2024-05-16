"use server"

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
