"use server"

import { getUser } from "@/server/auth"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { Apps } from "@/types/db_tables"

// exp. const foldersPath = bucketNameApp + `${app_slug}/${app_id}/${user.id}`
type DeleteFoldersProps = {
  foldersPath: string
  bucketName: string
}

// IMPORTANT: THIS FUNCTION SHOULD BE ONLY USED AFTER CHECKING USER'S AUTHORIZATION WITH THE ITEM'S SUBMITTER TO BE DELETED
export async function deleteFolders({
  foldersPath,
  bucketName,
}: DeleteFoldersProps) {
  const supabase = await createSupabaseServerClient()

  const { user } = await getUser()

  if (!user?.id) {
    return { error: "Unauthorized!" }
  }

  try {
    const { data: allItems, error: listError } = await supabase.storage
      .from(bucketName)
      .list(foldersPath)

    if (listError) {
      console.error("Error listing items:", listError)
      return { error: "An error occurred while listing items" }
    }

    const deletePromises = allItems.map(async (item) => {
      const itemPath = `${foldersPath}/${item.name}`
      if (item.id === null) {
        // Recurse into subfolder
        return deleteFolders({ foldersPath: itemPath, bucketName })
      } else {
        // Delete file
        return supabase.storage.from(bucketName).remove([itemPath])
      }
    })

    const results = await Promise.all(deletePromises)

    // Log results
    results.forEach((result, index) => {
      const itemPath = `${foldersPath}/${allItems[index].name}`
      if ("error" in result && result.error) {
        console.error(`Error deleting ${itemPath}:`, result.error)
      } else if ("data" in result && result.data) {
        // console.log(`Successfully deleted ${itemPath}`)
      }
    })

    return { error: null }
  } catch (error) {
    console.error("Unexpected error in deleteFolders:", error)
    return { error: "An unexpected error occurred while deleting folders" }
  }
}

export async function getScreenshotsFileNames(
  app_id: Apps["app_id"],
  app_slug: Apps["app_slug"],
  app_submitted_by_user_id: Apps["submitted_by_user_id"]
) {
  const supabase = await createSupabaseServerClient()

  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_APP!

  const { data, error } = await supabase.storage
    .from(bucketName)
    .list(`${app_slug}/${app_id}/${app_submitted_by_user_id}/screenshots`, {
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
  app_slug: Apps["app_slug"],
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
        `${app_slug}/${app_id}/${app_submitted_by_user_id}/screenshots/${fileName}`
      )

    if (data) screenshotsPublicUrls.push(data.publicUrl)
  })

  // TODO: TEST ANOTHER APPROACH, CHECK OUT GET POST IMAGES FUNCTIONS
  // const screenshotsPublicUrls = await Promise.all(
  //   fileNames.map(async (fileName) => {
  //     const { data } = await supabase.storage
  //       .from(bucketName)
  //       .getPublicUrl(
  //         `${app_slug}/${app_id}/${app_submitted_by_user_id}/screenshots/${fileName}`
  //       )
  // if (!data) {
  //   throw new Error(`Failed to get public URL for ${data}`)
  // }
  //     return data.publicUrl
  //   })
  // )

  return screenshotsPublicUrls
}

export async function getAppIconFileName(
  app_id: Apps["app_id"],
  app_slug: Apps["app_slug"],
  app_submitted_by_user_id: Apps["submitted_by_user_id"]
) {
  const supabase = await createSupabaseServerClient()

  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_APP!

  const { data, error } = await supabase.storage
    .from(bucketName)
    .list(`${app_slug}/${app_id}/${app_submitted_by_user_id}/icon`, {
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
  app_slug: Apps["app_slug"],
  app_submitted_by_user_id: Apps["submitted_by_user_id"],
  fileName: string
) {
  const supabase = await createSupabaseServerClient()
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_APP!

  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(
      `${app_slug}/${app_id}/${app_submitted_by_user_id}/icon/${fileName}`
    )

  return data.publicUrl
}
