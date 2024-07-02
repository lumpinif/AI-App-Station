"use server"

import { revalidatePath } from "next/cache"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { Profiles, ProfileWithRole } from "@/types/db_tables"

import { deleteFolders } from "../queries/supabase/storage"

export async function signUpWithEmailAndPassword(
  signUpData: {
    email: string
    password: string
  },
  redirectPath?: string
) {
  const supabase = await createSupabaseServerClient()

  const { data, error: signUpError } = await supabase.auth.signUp({
    email: signUpData.email,
    password: signUpData.password,
    options: {
      emailRedirectTo: redirectPath,
    },
  })

  if (data) {
    revalidatePath("/", "layout")
    revalidatePath("/user", "layout")
  }

  // Serialize and parse the `data` object
  // const serializedData = JSON.parse(JSON.stringify(data))

  // Create a plain object representation of the error
  const errorData = signUpError
    ? {
        name: signUpError.name,
        message: signUpError.message,
        status: signUpError.status,
        // Include other necessary error properties
      }
    : null

  return { data, error: errorData }
}

export async function signInWithEmailAndPassword(signInData: {
  email: string
  password: string
}) {
  const supabase = await createSupabaseServerClient()

  const { data, error: signInError } = await supabase.auth.signInWithPassword({
    email: signInData.email,
    password: signInData.password,
  })

  if (data.session || data.user) {
    revalidatePath("/", "layout")
    revalidatePath("/user", "layout")
  }

  // Serialize and parse the `data` object
  // const serializedData = JSON.parse(JSON.stringify(data))

  // Create a plain object representation of the error
  const errorData = signInError
    ? {
        name: signInError.name,
        message: signInError.message,
        status: signInError.status,
        // Include other necessary error properties
      }
    : null

  return { data, error: errorData }
}

export async function signOut() {
  const supabase = await createSupabaseServerClient()

  //check if there is a session logged in
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    const { error } = await supabase.auth.signOut()
    revalidatePath("/", "layout")
    return { error }
  }

  return null
}

export async function getUserSessionToken() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    console.error("Error fetching session:", error)
    return { error }
  }

  const token = session?.access_token

  if (!token) {
    return { error: "No access token found" }
  }

  return { token, error }
}

// FLAG: THIS FUNCTION CAN TRIGGER ISSUES ON CLIENT COMPONENTS
// TODO: CHECK AND RE-IMPLEMENT THIS FUNCTION TO BE ABLE TO USE ON BOTH CLIENT AND SERVER
export async function getUserData() {
  const supabase = await createSupabaseServerClient()
  // Useabge: const { data:{user}, error } = await supabase.auth.getUser()
  return await supabase.auth.getUser()
}

export async function getUser() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.error("Error fetching user data:", error)
    return { error }
  }

  return { user, error }
}

export async function getUserProfile() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await getUserData()

  if (user?.id) {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select(`*,profile_role(*)`)
      .eq("user_id", user.id)
      .maybeSingle()

    return { profile, error }
  }

  revalidatePath("/", "layout")
  revalidatePath("/user", "layout")

  return { profile: null }
}

export async function getUserRole() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await getUserData()

  // Check if user is super_admin, admin, or super_user, if so which means he or she is a verified author
  if (user?.id) {
    let { data: profile, error } = await supabase
      .from("profiles")
      .select(`*,profile_role!inner(*)`)
      .eq("user_id", user.id)
      .or("role.eq.super_admin,role.eq.admin,role.eq.super_user", {
        referencedTable: "profile_role",
      })
      .maybeSingle<ProfileWithRole>()

    return { profile, error }
  }

  return { profile: null }
}

export async function getUserAvatarUrl(filePath: string) {
  const supabase = await createSupabaseServerClient()
  const bucketName =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_AVATAR || "avatars"

  const { data: avatarPublicUrl } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath)

  return avatarPublicUrl.publicUrl
}

export async function updateProfileAvatar(
  profile: Profiles,
  avatar_public_url: string | null
) {
  const supabase = await createSupabaseServerClient()

  const { error: updateProfileError } = await supabase
    .from("profiles")
    .update({ avatar_url: avatar_public_url })
    .match({ user_id: profile.user_id })

  revalidatePath("/", "layout")

  return { updateProfileError }
}

export async function removeExistingAvatars(profile?: Profiles) {
  const supabase = await createSupabaseServerClient()
  const bucketName =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_AVATAR || "avatars"

  const { data: allAvatars, error: listAllAvatarsError } =
    await supabase.storage
      .from(bucketName)
      .list(`${profile?.user_name}/${profile?.user_id}`, {
        sortBy: { column: "name", order: "asc" },
      })

  if (listAllAvatarsError) {
    return { error: listAllAvatarsError }
  }

  // remove all allAvatars if there exist any before uploading new one
  if (allAvatars !== null && allAvatars.length !== 0) {
    for (const avatar of allAvatars) {
      const { data: removedAvatars, error: removeExistingAvatarError } =
        await supabase.storage
          .from(bucketName)
          .remove([`${profile?.user_name}/${profile?.user_id}/${avatar.name}`])

      if (removeExistingAvatarError) {
        return { error: removeExistingAvatarError }
      }

      if (removedAvatars) {
        return { data: removedAvatars }
      }
    }
  }

  return { data: null, error: null }
}

export async function resetAvatarUrl(profile?: Profiles) {
  const bucketName =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_AVATAR || "avatars"
  const {
    data: { user },
    error: getUserDataError,
  } = await getUserData()

  if (getUserDataError) {
    return { error: getUserDataError }
  }

  const oauth_avatar_url = user?.user_metadata.avatar_url

  const isOauthAvatar =
    oauth_avatar_url !== null &&
    oauth_avatar_url !== "" &&
    oauth_avatar_url !== undefined

  const isDefaultAvatar =
    profile?.avatar_url === oauth_avatar_url || profile?.avatar_url === null

  if (isDefaultAvatar) {
    return { error: "No need to rest avatar" }
  }

  if (isOauthAvatar) {
    const { updateProfileError } = await updateProfileAvatar(
      profile as Profiles,
      oauth_avatar_url
    )

    if (updateProfileError) {
      return { error: updateProfileError }
    }
  } else {
    const { updateProfileError } = await updateProfileAvatar(
      profile as Profiles,
      null
    )

    const { error } = await deleteFolders({
      foldersPath: `${profile?.user_name}/${profile?.user_id}`,
      bucketName,
    })

    if (error) {
      return { error }
    }

    if (updateProfileError) {
      return { error: updateProfileError }
    }
  }

  return { error: null }
}
