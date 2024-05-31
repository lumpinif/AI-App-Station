import { Profiles } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons/icons"

type AvatarIconProps = {
  profile: Profiles
  className?: string
  avatarClassName?: string
  onClick?: (e: any) => void
}

export const AvatarIcon: React.FC<AvatarIconProps> = ({
  profile,
  onClick,
  className,
  avatarClassName,
}) => {
  return (
    <Avatar
      className={cn(
        "flex items-center justify-center hover:cursor-pointer active:scale-[.98]",
        className
      )}
      onClick={onClick}
    >
      <AvatarImage
        src={`${profile.avatar_url}`}
        alt={`${profile.full_name || profile.user_name || "User"}`}
        className={cn(
          "h-full w-full animate-fade rounded-full object-cover",
          avatarClassName
        )}
      />
      <AvatarFallback className={cn("bg-transparent")}>
        <Icons.user
          className={cn(
            "h-[calc(75%)] w-[calc(75%)] rounded-full hover:cursor-pointer",
            avatarClassName
          )}
        />
      </AvatarFallback>
    </Avatar>
  )
}
