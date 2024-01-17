"use client"

import { Session } from "@supabase/auth-helpers-nextjs"

import { cn } from "@/lib/utils"
import useAuthModal from "@/hooks/use-auth-modal-store"

import { Icons } from "../../icons/icons"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Skeleton } from "../../ui/skeleton"

interface UserAvatarProps {
  session: Session | null
  className?: string
}

const UserAvatar = ({ session, className }: UserAvatarProps) => {
  const OpenModal = useAuthModal((state) => state.OpenModal)

  return (
    <Avatar
      className={cn(
        "flex cursor-pointer items-center justify-center outline-none",
        className
      )}
      onClick={OpenModal}
    >
      {session ? (
        <>
          <AvatarImage
            src={session.user?.user_metadata?.avatar_url}
            alt="User Avatar Image"
            className="animate-reveal"
            loading="eager"
          />
          <AvatarFallback>
            {session.user?.user_metadata?.avatar_url ? (
              <Skeleton className={cn("h-12 w-12 rounded-full", className)} />
            ) : (
              session.user.email!.substring(0, 2).toUpperCase()
            )}
          </AvatarFallback>
        </>
      ) : (
        <Icons.user className="h-full w-full rounded-full p-2 dark:shadow-outline" />
      )}
    </Avatar>
  )
}

export default UserAvatar
