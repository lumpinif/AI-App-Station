import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { createImageUpload } from "novel/plugins"
import { toast } from "sonner"

import { Apps } from "@/types/db_tables"

const onUpload = async (
  file: File,
  app_id: Apps["app_id"],
  submitted_by_user_id: Apps["submitted_by_user_id"]
) => {
  const bucketNameApp = process.env
    .NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_APP as string
  const uploadPath = `${app_id}/${submitted_by_user_id}/introduction/${file.name}`

  return new Promise<string>((resolve, reject) => {
    const supabase = createSupabaseBrowserClient()
    supabase.storage
      .from(bucketNameApp)
      .upload(uploadPath, file, {
        cacheControl: "3600",
        upsert: true,
      })
      .then(({ error }) => {
        if (error) {
          toast.error("Error uploading image. Please try again.")
          reject(error)
        } else {
          const { data: publicUrlData } = supabase.storage
            .from("apps")
            .getPublicUrl(uploadPath)
          const publicUrl = publicUrlData.publicUrl

          // Preload the image
          const image = new Image()
          image.src = publicUrl
          image.onload = () => {
            toast.success("Image uploaded successfully.")
            resolve(publicUrl)
          }
          image.onerror = () => {
            toast.error("Error loading the uploaded image.")
            reject(new Error("Failed to load the uploaded image."))
          }
        }
      })
  })
}

export const createUploadFn = (
  app_id: Apps["app_id"],
  submitted_by_user_id: Apps["submitted_by_user_id"]
) => {
  return createImageUpload({
    onUpload: (file) => onUpload(file, app_id, submitted_by_user_id),
    validateFn: (file) => {
      if (!file.type.includes("image/")) {
        toast.error("File type not supported.")
        return false
      } else if (file.size / 1024 / 1024 > 20) {
        toast.error("File size too big (max 20MB).")
        return false
      }
      return true
    },
  })
}
