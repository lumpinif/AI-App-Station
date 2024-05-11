import { useState } from "react"
import { useRouter } from "next/navigation"
import { getUserAvatarUrl, removeExistingAvatars } from "@/server/auth"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { toast } from "sonner"

import { Profile } from "@/types/db_tables"

export function useAvatarUploader(
  profile: Profile,
  onUpload?: (filePath: string) => void
) {
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_AVATAR!!

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      toast.error("You must select an image to upload.")
      return
    }

    const file = event.target.files[0]
    const filePath = `${profile?.user_id}/${file.name}`

    const uploadProcess = async () => {
      setIsUploading(true)

      const { error: removeExistingAvatarsError } =
        await removeExistingAvatars(profile)

      if (removeExistingAvatarsError) {
        throw new Error(removeExistingAvatarsError.message)
      }

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, { upsert: true })
      if (uploadError) {
        throw new Error(uploadError.message)
      }

      const avatarPublicUrl = await getUserAvatarUrl(filePath)
      return avatarPublicUrl
    }

    toast.promise(uploadProcess(), {
      loading: "Uploading avatar...",
      success: (avatarPublicUrl) => {
        if (onUpload) {
          onUpload(avatarPublicUrl)
        }
        router.refresh()
        setIsUploading(false)
        return "Avatar uploaded successfully!"
      },
      error: (error) => {
        setIsUploading(false)
        return error.message || "Error uploading avatar"
      },
    })

    // try {
    //   setIsUploading(true)

    //   // remove existings avatars
    //   const { data: removedAvatars, error: removeExistingAvatarsError } =
    //     await removeExistingAvatars(profile)

    //   if (removeExistingAvatarsError) {
    //     toast.error(removeExistingAvatarsError.message)
    //     return
    //   }

    //   const { error: uploadError } = await supabase.storage
    //     .from(bucketName)
    //     .upload(filePath, file, { upsert: true })

    //   if (uploadError) {
    //     toast.error(uploadError.message)
    //     return
    //   }

    //   const avatarPublicUrl = await getUserAvatarUrl(filePath)

    //   if (onUpload) onUpload(avatarPublicUrl)
    // } catch (error) {
    //   // Convert error to a simple message if it's an instance of an Error
    //   const errorMessage =
    //     error instanceof Error ? error.message : "Unknown error"
    //   toast.error(`Error uploading avatar: ${errorMessage}`)
    // } finally {
    //   setIsUploading(false)
    //   router.refresh()
    // }
  }

  return { uploadAvatar, isUploading }
}
