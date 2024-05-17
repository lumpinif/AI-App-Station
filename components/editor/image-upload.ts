import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { createImageUpload } from "novel/plugins"
import { toast } from "sonner"

import { Apps, Posts } from "@/types/db_tables"

const onUpload = async (
  file: File,
  bucketName: string,
  uploadTo: string,
  content_id?: Apps["app_id"] | Posts["post_id"],
  user_id?: Apps["submitted_by_user_id"] | Posts["post_author_id"]
) => {
  const uploadPath = `${content_id}/${user_id}/${uploadTo}/${file.name}`

  return new Promise<string>((resolve, reject) => {
    const supabase = createSupabaseBrowserClient()
    supabase.storage
      .from(bucketName)
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
            .from(bucketName)
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
  bucketName: string,
  uploadTo: string,
  content_id: Apps["app_id"] | Posts["post_id"],
  user_id: Apps["submitted_by_user_id"] | Posts["post_author_id"]
) => {
  return createImageUpload({
    onUpload: (file) =>
      onUpload(file, bucketName, uploadTo, content_id, user_id),
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
