import { useState } from "react"
import { useRouter } from "next/navigation"
import { resetAvatarUrl } from "@/server/auth"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { Profiles } from "@/types/db_tables"
import { SpinnerButton } from "@/components/shared/spinner-button"

type AvatarResetButtonProps = {
  profile?: Profiles
  setIsUploading?: (isUploading: boolean) => void
  isDefaultAvatar?: boolean
}

export const AvatarResetButton: React.FC<AvatarResetButtonProps> = ({
  profile,
  setIsUploading,
  isDefaultAvatar,
}) => {
  const [isReseting, setIsReseting] = useState(false)

  const router = useRouter()
  const queryClient = useQueryClient()

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

  return (
    <SpinnerButton
      isLoading={isReseting}
      size={"sm"}
      variant={"outline"}
      onClick={handleOnClick}
      disabled={isDefaultAvatar}
      className="w-28 max-w-28 text-sm text-muted-foreground"
    >
      Reset Avatar
    </SpinnerButton>
  )
}
