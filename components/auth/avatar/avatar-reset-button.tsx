import { useState } from "react"
import { useRouter } from "next/navigation"
import { resetAvatarUrl } from "@/server/auth"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { Profile } from "@/types/db_tables"
import { useUserData } from "@/hooks/react-hooks/use-user"
import { SpinnerButton } from "@/components/shared/spinner-button"

type AvatarResetButtonProps = {
  profile?: Profile
  setIsUploading?: (isUploading: boolean) => void
}

export const AvatarResetButton: React.FC<AvatarResetButtonProps> = ({
  profile,
  setIsUploading,
}) => {
  const [isReseting, setIsReseting] = useState(false)
  const { data: user } = useUserData()

  const router = useRouter()
  const queryClient = useQueryClient()

  const isDefaultAvatar =
    !profile?.avatar_url ||
    profile?.avatar_url === "" ||
    user?.user_metadata.avatar_url === profile?.avatar_url

  const handleOnClick = async () => {
    const updateAvatarProcess = async () => {
      setIsReseting(true)
      if (setIsUploading) setIsUploading(true)

      const { error: resetAvatarUrlError } = await resetAvatarUrl(profile)

      if (resetAvatarUrlError) {
        setIsReseting(false)
        if (setIsUploading) setIsUploading(false)

        const errorMessages =
          typeof resetAvatarUrlError === "string"
            ? resetAvatarUrlError
            : resetAvatarUrlError.message

        throw new Error(errorMessages)
      }

      router.refresh()
      queryClient.invalidateQueries({
        queryKey: ["profile"],
        exact: true,
      })
    }

    toast.promise(updateAvatarProcess(), {
      loading: "Reseting avatar...",
      success: () => {
        setIsReseting(false)
        if (setIsUploading) setIsUploading(false)
        return "Avatar reset successfully"
      },
      error: (error) => {
        setIsReseting(false)
        return error.message || "Error reseting avatar"
      },
    })
  }

  if (!isDefaultAvatar)
    return (
      <SpinnerButton
        isLoading={isReseting}
        size={"sm"}
        variant={"outline"}
        onClick={handleOnClick}
        disabled={isDefaultAvatar}
        className="text-muted-foreground text-sm"
      >
        Reset Avatar
      </SpinnerButton>
    )
}
