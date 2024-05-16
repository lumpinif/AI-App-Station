"use client"

import { HoverCardProps } from "@radix-ui/react-hover-card"
import { CalendarDays } from "lucide-react"

import { Profiles } from "@/types/db_tables"
import { timeConverter } from "@/lib/utils"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { AvatarIcon } from "@/components/auth/avatar/avatar-icon"

type HoverCardContentProps = React.ComponentProps<typeof HoverCardContent>

type UserHoverCardProps = HoverCardProps &
  HoverCardContentProps & {
    children?: React.ReactNode
    profile: Profiles
  }

export const UserHoverCard: React.FC<UserHoverCardProps> = ({
  children,
  profile,
  sideOffset = 10,
  align = "center",
  ...props
}) => {
  const joinedTime = timeConverter(profile.created_at)

  return (
    <HoverCard openDelay={100} closeDelay={200} {...props}>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent
        align={align}
        sideOffset={sideOffset}
        className="glass-card-background w-fit max-w-xs border border-none backdrop-blur-md"
        {...props}
      >
        <div className="flex flex-col justify-between gap-y-4">
          <div className="flex items-center gap-x-2">
            <AvatarIcon profile={profile} className="size-10 flex-none" />
            <div className="flex flex-1 flex-col space-y-2">
              <span className="h-full">
                <h4 className="text-sm font-semibold">{profile.full_name}</h4>
                <span className="text-muted-foreground text-sm">
                  {profile.user_bio}
                </span>
              </span>
            </div>
          </div>
          <div className="flex items-center pt-2">
            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-muted-foreground text-xs">
              Joined {joinedTime}
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
