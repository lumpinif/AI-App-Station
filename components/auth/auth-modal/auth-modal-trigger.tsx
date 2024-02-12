"use client"

import { cn } from "@/lib/utils"
import useAuthModal from "@/hooks/use-auth-modal-store"
import useUser from "@/hooks/use-user"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons/icons"

const AuthModalTrigger = ({ className }: { className?: string }) => {
  const OpenModal = useAuthModal((state) => state.OpenModal)
  const { isFetching, data: profile } = useUser()

  if (isFetching) {
    return (
      <Avatar
        className={cn(
          "flex items-center justify-center hover:cursor-pointer hover:bg-foreground/10",
          className
        )}
        onClick={OpenModal}
      >
        <Icons.user className="h-[22px] w-[22px] animate-fade rounded-full hover:cursor-pointer" />
      </Avatar>
    )
  }

  return (
    <Avatar
      className={cn(
        "flex animate-fade items-center justify-center hover:cursor-pointer hover:bg-foreground/10",
        className
      )}
      onClick={OpenModal}
    >
      {!profile?.avatar_url ? (
        <Icons.user className="h-[22px] w-[22px] animate-fade rounded-full hover:cursor-pointer" />
      ) : (
        <AvatarImage
          src={`${profile.avatar_url}`}
          alt={`${profile.display_name}`}
          className="animate-fade"
        />
      )}
    </Avatar>
  )
}

export default AuthModalTrigger
