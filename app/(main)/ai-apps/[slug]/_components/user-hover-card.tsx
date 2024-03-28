import { CalendarDays } from "lucide-react"

import { Profiles } from "@/types/db_tables"
import { timeConverter } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Icons } from "@/components/icons/icons"

type UserHoverCardProps = {
  user_name: Profiles["full_name"]
  avatar_url: Profiles["avatar_url"]
  user_joined: Profiles["created_at"]
}

export const UserHoverCard: React.FC<UserHoverCardProps> = ({
  user_name,
  avatar_url,
  user_joined,
}) => {
  const joinedTime = timeConverter(user_joined)
  return (
    <HoverCard openDelay={400} closeDelay={200}>
      <HoverCardTrigger asChild>
        <Button variant="link">{user_name}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="glass-card-background w-fit max-w-xs border border-none shadow-outline backdrop-blur-md">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={`${avatar_url}`} />
            <AvatarFallback>
              <Icons.user />
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
