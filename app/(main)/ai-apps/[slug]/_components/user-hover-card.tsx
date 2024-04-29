import Link from "next/link"
import { CalendarDays } from "lucide-react"

import { Profile } from "@/types/db_tables"
import { cn, timeConverter } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Icons } from "@/components/icons/icons"

type UserHoverCardProps = {
  triggerClassName?: string
  user_name: Profile["full_name"]
  avatar_url: Profile["avatar_url"]
  user_joined: Profile["created_at"]
}

export const UserHoverCard: React.FC<UserHoverCardProps> = ({
  user_name,
  avatar_url,
  user_joined,
  triggerClassName,
}) => {
  const joinedTime = timeConverter(user_joined)

  // TODO: DEFINE USER_SLUG BEFORE PRODUCTION
  const user_slug = "user_slug"

  return (
    <HoverCard openDelay={400} closeDelay={200}>
      <HoverCardTrigger asChild>
        <Link
          href={`/user/${user_slug}`}
          className={cn(
            "w-fit text-primary underline-offset-4 hover:underline",
            triggerClassName
          )}
          target="_blank"
        >
          {user_name}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="glass-card-background w-fit max-w-xs border border-none shadow-outline backdrop-blur-md">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage
              src={`${avatar_url}`}
              className="animate-fade rounded-full"
            />
            <AvatarFallback>
              <Icons.user
                className={cn(
                  "h-[calc(75%)] w-[calc(75%)] animate-fade rounded-full"
                )}
              />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <span className="h-full">
              <h4 className="text-sm font-semibold">{user_name}</h4>
              <span className="text-sm">
                The React Framework – created and maintained by @vercel.
              </span>
            </span>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined {joinedTime}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
