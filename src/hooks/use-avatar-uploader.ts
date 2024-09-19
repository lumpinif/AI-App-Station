import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  getUserAvatarUrl,
  removeExistingAvatars,
  updateProfileAvatar,
} from "@/server/auth"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { Profiles } from "@/types/db_tables"

export function useAvatarUploader(
  profile: Profiles,
  onUpload?: (filePath: string) => void
) {
  const [isUploading, setIsUploading] = useState(false)
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_AVATAR!!
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()
  const queryClient = useQueryClient()

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      toast.error("You must select an image to upload.")
      return
    }

    const file = event.target.files[0]
    const filePath = `${profile.user_name}/${profile?.user_id}/${file.name}`

    const onUploadSuccess = async (avatarPublicUrl: string) => {
      const { updateProfileError } = await updateProfileAvatar(
        profile as Profiles,
        avatarPublicUrl
      )

      if (updateProfileError) {
        setIsUploading(false)
        throw new Error(updateProfileError.message)
      }

      router.refresh()
      queryClient.invalidateQueries({
        queryKey: ["profile"],
        exact: true,
      })
    }

    const uploadProcess = async () => {
      setIsUploading(true)

      const { error: removeExistingAvatarsError } =
        await removeExistingAvatars(profile)

      if (removeExistingAvatarsError) {
        setIsUploading(false)
        throw new Error(removeExistingAvatarsError.message)
      }

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, { upsert: true })

      if (uploadError) {
        setIsUploading(false)
        throw new Error(uploadError.message)
      }

      const avatarPublicUrl = await getUserAvatarUrl(filePath)

      await onUploadSuccess(avatarPublicUrl)

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
        return "Avatar uploaded successfully"
      },
      error: (error) => {
        setIsUploading(false)
        return error.message || "Error uploading avatar"
      },
    })
  }

  return { uploadAvatar, isUploading, setIsUploading }
}
