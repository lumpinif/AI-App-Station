import Link from "next/link"
import { BadgeCheck, CalendarDays, Globe, MapPin } from "lucide-react"

import { Profiles } from "@/types/db_tables"
import {
  checkIsSuperUser,
  cn,
  getProfileRoleName,
  timeConverter,
} from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/icons/icons"

type UserHoverCardProps = {
  profile?: Profiles
  triggerClassName?: string
  children?: React.ReactNode
  hoverCardProps?: React.ComponentPropsWithoutRef<typeof HoverCard>
  hoverCardContentProps?: React.ComponentPropsWithoutRef<
    typeof HoverCardContent
  >
}

export const UserHoverCard: React.FC<UserHoverCardProps> = ({
  profile,
  children,
  hoverCardProps,
  triggerClassName,
  hoverCardContentProps,
}) => {
  // TODO: REPLACE THIS HOVER CARD WITH THE ONE FROM THE STORY
  const {
    user_bio,
    user_name,
    user_location,
    full_name,
    user_website,
    avatar_url,
    created_at,
    profile_role,
  } = profile || {}

  const user_joined = created_at
  const displayName = full_name || user_name
  const isSuperUser = checkIsSuperUser(profile_role?.role)
  const profileRoleName = getProfileRoleName(profile_role?.role)
  const joinedTime = timeConverter(user_joined)

  const userWebsite = user_website

  return (
    <TooltipProvider delayDuration={10}>
      <HoverCard openDelay={200} closeDelay={200} {...hoverCardProps}>
        <HoverCardTrigger asChild>
          {/* <Link
          href={`/user/user_slug`}
          className={cn(
            "w-fit text-primary underline-offset-4 hover:underline",
            triggerClassName
          )}
          target="_blank"
        > */}
          {children ? (
            children
          ) : (
            <div
              className={cn(
                "w-fit cursor-default text-primary underline-offset-4 hover:underline",
                triggerClassName
              )}
            >
              <span className="flex items-center gap-x-1">
                {displayName}
                {isSuperUser && (
                  <Tooltip>
                    <TooltipTrigger>
                      <BadgeCheck className="size-3 fill-blue-600 stroke-background" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{profileRoleName}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </span>
            </div>
          )}
          {/* </Link> */}
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          sideOffset={15}
          alignOffset={-15}
          className="w-fit max-w-xs border border-border bg-background/70 shadow-md backdrop-blur-md dark:border-0 dark:shadow-outline"
          {...hoverCardContentProps}
        >
          <div className="relative flex w-full justify-between gap-x-4 overflow-hidden">
            {/* Left section */}
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

            {/* Right section */}
            <section className="flex h-full w-full flex-col justify-between space-y-2 overflow-hidden">
              <div className="h-full flex-1">
                {/* Display name */}
                <div className="flex items-center justify-between gap-x-1">
                  {/* TODO: CHANGE THE USER LINK AFTER BUILD THE USER PAGE */}

                  {/* {userWebsite ? (
                    <Link href={userWebsite}>
                      <h4 className="hover:underline-offset-3 text-sm font-semibold hover:underline">
                        {displayName}
                      </h4>
                    </Link>
                  ) : (
                    <h4 className="text-sm font-semibold">{displayName}</h4>
                  )} */}
                  <div className="flex items-center gap-x-1">
                    <h4 className="text-sm font-semibold">{displayName}</h4>

                    {isSuperUser && (
                      <Tooltip>
                        <TooltipTrigger>
                          <BadgeCheck className="size-3 fill-blue-600 stroke-background" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{profileRoleName}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>

                  <div className="flex items-center gap-x-1">
                    {userWebsite && (
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href={userWebsite}>
                            <Globe className="size-3 text-muted-foreground transition-all duration-150 ease-out hover:text-primary" />
                          </Link>
                        </TooltipTrigger>

                        <TooltipContent>
                          <p>User&rsquo;s website</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </div>

                {/* User Bio */}
                {user_bio && (
                  <span className="line-clamp-3 truncate text-balance text-sm text-muted-foreground">
                    {user_bio}
                  </span>
                )}
              </div>

              {/* footer */}
              <div className="flex w-full items-center justify-between gap-x-2">
                {/* Join time */}
                <div className="flex items-center">
                  <CalendarDays className="mr-1 size-3 opacity-70" />
                  <span className="text-nowrap text-xs text-muted-foreground">
                    Joined {joinedTime}
                  </span>
                </div>

                {/* User location */}
                {user_location && (
                  <div className="flex items-center">
                    <MapPin className="mr-1 size-3 shrink-0 opacity-70" />
                    <span className="line-clamp-1 text-xs text-muted-foreground">
                      {user_location}
                    </span>
                  </div>
                )}
              </div>
            </section>
          </div>
        </HoverCardContent>
      </HoverCard>
    </TooltipProvider>
  )
}

type HoverCardTriggerProps = {
  displayName?: string
  isSuperUser?: boolean
  profileRoleName?: string
  triggerClassName?: string
  children?: React.ReactNode
}

export const HCTrigger: React.FC<HoverCardTriggerProps> = ({
  children,
  displayName,
  isSuperUser,
  profileRoleName,
  triggerClassName,
}) => {
  return (
    <div
      className={cn(
        "w-fit cursor-default text-primary underline-offset-4 hover:underline",
        triggerClassName
      )}
    >
      <span className="flex items-center gap-x-1">
        {displayName}
        {isSuperUser && (
          <Tooltip>
            <TooltipTrigger>
              <BadgeCheck className="size-3 fill-blue-600 stroke-background" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{profileRoleName}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </span>
    </div>
  )
}
