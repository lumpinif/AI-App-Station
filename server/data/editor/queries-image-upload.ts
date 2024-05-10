"use server"

import { revalidatePath } from "next/cache"
import { getUserData } from "@/server/auth"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { App } from "@/types/db_tables"

import { getSlugFromAppId } from "../supabase-actions"

export async function uploadAndGetIntroductionImage(
  app_id: App["app_id"],
  submitted_by_user_id: App["submitted_by_user_id"],
  file: File,
  uploadPath: string
) {
  const supabase = await createSupabaseServerClient()
  const slug = await getSlugFromAppId(app_id)

  const bucketNameApp = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_APP!

  const {
    data: { user },
  } = await getUserData()

  if (!user) {
    throw new Error("User not found.")
  }

  if (user.id !== submitted_by_user_id) {
    throw new Error("User is not the owner of the app.")
  }

  const { error: uploadError } = await supabase.storage
    .from(bucketNameApp)
    .upload(uploadPath, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (uploadError) {
    throw new Error(`Error uploading image: ${uploadError}`)
  }

  const { data: publicURLData } = supabase.storage
    .from("apps")
    .getPublicUrl(uploadPath)

  revalidatePath(`/ai-apps/${slug?.app_slug}`)
  revalidatePath(`/user/apps/${app_id}`)

  const publicURL = publicURLData.publicUrl

  return { publicURL, error: null }
}
