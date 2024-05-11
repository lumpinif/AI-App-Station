"use client"

import { useRouter } from "next/navigation"
import { updateProfileAvatar } from "@/server/auth"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { Profile } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useUser from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"
import { Avatar } from "@/components/ui/avatar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Icons } from "@/components/icons/icons"

import { UserAvatar } from "../avatar/user-avatar"

type AccountModalTriggerProps = {
  href?: string
  profile?: Profile
  className?: string
  isFetching?: boolean
  isTriggerModal?: boolean
  avatarClassName?: string
  withAvartarUploader?: boolean
}

const AccountModalTrigger = ({
  href,
  className,
  avatarClassName,
  profile: propProfile,
  withAvartarUploader,
  isTriggerModal = true,
  isFetching: propIsFetching,
}: AccountModalTriggerProps) => {
  const OpenModal = useAccountModal((state) => state.OpenModal)
  const isModalOpen = useAccountModal((state) => state.isOpen)
  const { isFetching: hookIsFetching, data: hookProfile } = useUser()
  const queryClient = useQueryClient()
  const router = useRouter()
  const isFetching = !propIsFetching ? hookIsFetching : propIsFetching
  const profile = !propProfile ? hookProfile : propProfile

  const handleAvartarModalTriggerClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!isTriggerModal) return
    if (!isModalOpen) {
      e.preventDefault()
      OpenModal()
      e.stopPropagation()
    } else {
      router.push(href || "/user")
    }
  }

  if (isFetching) {
    return (
      <Avatar
        className={cn(
          "hover:bg-foreground/10 flex animate-pulse items-center justify-center hover:cursor-pointer",
          className
        )}
      >
        <Icons.user
          className={cn(
            "animate-fade h-[calc(75%)] w-[calc(75%)] rounded-full hover:cursor-pointer",
            avatarClassName
          )}
        />
      </Avatar>
    )
  }

  const handleUpdateProfileAvatar = async (avatarPublicUrl: string) => {
    // Ensure that the promise returned from updateProfileAvatar is used correctly
    const updatePromise = updateProfileAvatar(
      profile as Profile,
      avatarPublicUrl
    )

    toast.promise(
      // This promise resolves to an object containing either an updateProfileError or null
      updatePromise.then((response) => {
        if (response.updateProfileError) {
          // If there's an error, throw it so that toast.promise handles it in the 'error' case
          throw response.updateProfileError
        }
        return response // Return response on successful update
      }),
      {
        loading: "Updating avatar...",
        success: (data) => {
          // Check if there was no error updating the profile avatar
          if (!data.updateProfileError) {
            // Actions to perform after a successful avatar update
            router.refresh()
            queryClient.invalidateQueries({
              queryKey: ["profile"],
              exact: true,
            })

            return "Profile avatar updated!"
          } else {
            // Handle case where updateProfileError is not null
            return `Failed to update avatar: ${data.updateProfileError.message}`
          }
        },
        error: (err) => {
          // Error handling: Display a custom message if available, or a default message
          return err.message || "Error updating profile avatar"
        },
      }
    )
  }

  return (
    <TooltipProvider>
      {withAvartarUploader ? (
        <UserAvatar
          profile={profile}
          className={className}
          onUpload={handleUpdateProfileAvatar}
          avatarClassName={avatarClassName}
          withAvatarUploader={withAvartarUploader}
        />
      ) : (
        <UserAvatar
          profile={profile}
          onClick={handleAvartarModalTriggerClick}
          className={className}
          avatarClassName={avatarClassName}
        />
      )}
    </TooltipProvider>
  )
}

export default AccountModalTrigger
