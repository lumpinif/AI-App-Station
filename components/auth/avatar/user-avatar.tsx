"use client"

import { Session } from "@supabase/auth-helpers-nextjs"

import { cn } from "@/lib/utils"
import useAuthModal from "@/hooks/use-auth-modal-store"
import { useUserProfile } from "@/hooks/use-user-profile"

import { Icons } from "../../icons/icons"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"

interface UserAvatarProps {
  session: Session | null
  className?: string
}

const UserAvatar = ({ session, className }: UserAvatarProps) => {
  const { avatarUrl } = useUserProfile(session?.user ?? null)

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
            src={avatarUrl || session.user?.user_metadata?.avatar_url}
            alt="User Avatar Image"
            loading="eager"
          />
          <AvatarFallback>
            <span>{session.user?.email?.substring(0, 2).toUpperCase()}</span>
          </AvatarFallback>
        </>
      ) : (
        <Icons.user className="h-full w-full rounded-full p-2 dark:shadow-outline" />
      )}
    </Avatar>
  )
}

export default UserAvatar
