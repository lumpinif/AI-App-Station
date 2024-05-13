"use server"

import { revalidatePath } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { Profile } from "@/types/db_tables"
import { ProfileFormValues } from "@/components/auth/settings/profile/profile-form"

export async function updateUserProfile(
  user_id: Profile["user_id"],
  formData: ProfileFormValues
) {
  const supabase = await createSupabaseServerClient()

  // Iterate over formData and update empty strings to null
  for (let key in formData) {
    if (formData[key as keyof typeof formData] === "") {
      formData[key as keyof typeof formData] = null
    }
  }

  try {
    const { error } = await supabase
      .from("profiles")
      .update({ ...formData })
      .match({ user_id })

    if (error) {
      console.error("Error updating profile:", error)
      return {
        error: {
          message: "An error occurred while updating the profile.",
          details: error.message,
        },
      }
    }

    revalidatePath("/user")

    return { success: true }
  } catch (error) {
    console.error("Error in updateUserProfile:", error)
    return {
      error: {
        message: "An unexpected error occurred.",
        details: "Please try again later.",
      },
    }
  }
}
