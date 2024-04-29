"use client"

import { MouseEvent } from "react"

import { Profile } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useUser from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons/icons"

type typeOfProfile = Profile | { [key: string]: any }

type AccountModalTriggerProps = {
  className?: string
  isFetching?: boolean
  profile?: typeOfProfile
}

const AccountModalTrigger = ({
  className,
  isFetching: propIsFetching,
  profile: propData,
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
          "flex animate-pulse items-center justify-center hover:cursor-pointer hover:bg-foreground/10",
          className
        )}
      >
        <Icons.user
          className={cn(
            "h-[calc(75%)] w-[calc(75%)] animate-fade rounded-full hover:cursor-pointer"
          )}
        />
      </Avatar>
    )
  }

  return (
    <Avatar
      className={cn(
        "flex animate-fade items-center justify-center hover:cursor-pointer",
        className
      )}
      onClick={handleAvartarModalTriggerClick}
    >
      {!profile?.avatar_url ? (
        <Icons.user className="h-[calc(75%)] w-[calc(75%)] animate-fade rounded-full hover:cursor-pointer" />
      ) : (
        <AvatarImage
          src={`${profile.avatar_url}`}
          alt={`${profile.full_name || profile.user_name || "User"}`}
          className="h-full w-full animate-fade rounded-full object-cover"
        />
      )}
    </Avatar>
  )
}

export default AccountModalTrigger
