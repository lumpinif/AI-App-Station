import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { createImageUpload } from "novel/plugins"
import { toast } from "sonner"

import { Apps, Posts } from "@/types/db_tables"

type OnUploadProps = {
  file: File
  uploadTo: string
  bucketName: string
  content_id?: Apps["app_id"] | Posts["post_id"]
  content_slug: Apps["app_slug"] | Posts["post_slug"]
  user_id?: Apps["submitted_by_user_id"] | Posts["post_author_id"]
}

const onUpload = async ({
  file,
  user_id,
  uploadTo,
  bucketName,
  content_id,
  content_slug,
}: OnUploadProps) => {
  // FLAG: avoid using the content_slug as the folder name as it can be changed by the user
  const uploadPath = `${content_id}/${user_id}/${uploadTo}/${content_slug}-${file.name}`

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
            .getPublicUrl(uploadPath, {
              transform: {
                quality: 80,
              },
            })
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

type CreateUploadFnProps = Omit<OnUploadProps, "file">

export const createUploadFn = ({
  user_id,
  uploadTo,
  bucketName,
  content_id,
  content_slug,
}: CreateUploadFnProps) => {
  return createImageUpload({
    onUpload: (file) =>
      onUpload({
        file,
        user_id,
        uploadTo,
        bucketName,
        content_id,
        content_slug,
      }),
    validateFn: (file) => {
      if (!file.type.includes("image/")) {
        toast.error("File type not supported.")
        return false
      } else if (file.size / 1024 / 1024 > 3) {
        toast.error("File size too big (max 3MB).")
        return false
      }
      return true
    },
  })
}
