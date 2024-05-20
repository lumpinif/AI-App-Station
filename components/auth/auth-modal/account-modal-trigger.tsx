"use client"

import { useRouter } from "next/navigation"

import { Profiles } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useUserProfile from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"
import { Avatar } from "@/components/ui/avatar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Icons } from "@/components/icons/icons"

import { UserAvatar } from "../avatar/user-avatar"

type AccountModalTriggerProps = {
  href?: string
  profile?: Profiles
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
  withAvartarUploader = false,
  isTriggerModal = true,
  isFetching: propIsFetching,
}: AccountModalTriggerProps) => {
  const openAccountModal = useAccountModal((state) => state.openModal)
  const isModalOpen = useAccountModal((state) => state.isOpen)
  const { isFetching: hookIsFetching, data: hookProfile } = useUserProfile()

  const router = useRouter()
  const isFetching = !propIsFetching ? hookIsFetching : propIsFetching
  const profile = !propProfile ? hookProfile : propProfile

  const handleAvartarModalTriggerClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!isTriggerModal) return
    if (!isModalOpen) {
      e.preventDefault()
      openAccountModal()
      e.stopPropagation()
    } else {
      router.push(href || "/user")
    }
  }

  if (isFetching) {
    return (
      <Avatar
        className={cn(
          "hover:bg-foreground/10 flex animate-pulse items-center justify-center",
          className
        )}
      >
        <Icons.user
          className={cn(
            "animate-fade h-[calc(75%)] w-[calc(75%)] rounded-full",
            avatarClassName
          )}
        />
      </Avatar>
    )
  }

  return (
    <TooltipProvider>
      {withAvartarUploader ? (
        <UserAvatar
          profile={profile as Profiles}
          className={className}
          avatarClassName={avatarClassName}
          withAvatarUploader={withAvartarUploader}
        />
      ) : (
        <UserAvatar
          profile={profile as Profiles}
          onClick={handleAvartarModalTriggerClick}
          className={cn(
            className,
            isTriggerModal
              ? "hover:cursor-pointer"
              : "cursor-default hover:cursor-default"
          )}
          avatarClassName={avatarClassName}
        />
      )}
    </TooltipProvider>
  )
}

export default AccountModalTrigger
