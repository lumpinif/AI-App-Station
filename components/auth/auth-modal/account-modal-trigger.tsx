"use client"

import { MouseEvent } from "react"

import { Profile } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useUser from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons/icons"

type AccountModalTriggerProps = {
  className?: string
  isFetching?: boolean
  profile?: Profile
  avatarClassName?: string
}

const AccountModalTrigger = ({
  className,
  isFetching: propIsFetching,
  profile: propData,
  avatarClassName,
}: AccountModalTriggerProps) => {
  const OpenModal = useAccountModal((state) => state.OpenModal)
  const { isFetching: hookIsFetching, data: hookData } = useUser()

  const isFetching = !propIsFetching ? hookIsFetching : propIsFetching
  const profile = !propData ? hookData : propData

  const handleAvartarModalTriggerClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    OpenModal()
    e.stopPropagation()
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

  return (
    <Avatar
      className={cn(
        "flex items-center justify-center hover:cursor-pointer",
        className
      )}
      onClick={handleAvartarModalTriggerClick}
    >
      {!profile?.avatar_url ? (
        <Icons.user
          className={cn(
            "h-[calc(75%)] w-[calc(75%)] rounded-full hover:cursor-pointer",
            avatarClassName
          )}
        />
      ) : (
        <AvatarImage
          src={`${profile.avatar_url}`}
          alt={`${profile.full_name || profile.user_name || "User"}`}
          className={cn(
            "animate-fade h-full w-full rounded-full object-cover",
            avatarClassName
          )}
        />
      )}
    </Avatar>
  )
}

export default AccountModalTrigger
