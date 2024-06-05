import { Posts, Profiles } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { AvatarIcon } from "@/components/auth/avatar/avatar-icon"

import { UserHoverCard } from "./user-hover-card"

type AuthorCardProps = {
  author: Profiles
  InfoCN?: string
  avatarCN?: string
  className?: string
  authorNameCN?: string
  children?: React.ReactNode
  post_created_at: Posts["created_at"]
}

export const AuthorCard: React.FC<AuthorCardProps> = ({
  author,
  InfoCN,
  children,
  avatarCN,
  className,
  authorNameCN,
  post_created_at,
}) => {
  return (
    <div className={cn("flex items-center gap-x-2 sm:gap-x-4", className)}>
      <UserHoverCard profile={author} sideOffset={10} align="start">
        <AvatarIcon
          profile={author}
          className={cn("size-10 select-none", avatarCN)}
        />
      </UserHoverCard>
      {/* Author and time Info */}
      <div className={cn("flex flex-col", InfoCN)}>
        <UserHoverCard profile={author} sideOffset={10} align="start">
          <div
            className={cn(
              "font-semibold underline-offset-4 hover:cursor-pointer hover:underline",
              authorNameCN
            )}
          >
            {author.full_name}
          </div>
        </UserHoverCard>
        <div className="flex items-center gap-x-2 text-muted-foreground">
          {/* TODO: IMPLEMENT VIEWS_COUNT FOR THE POST SOMEWHERE ELSE */}
          {/* {views_count && <span>{views_count}</span>} */}
          {/* TODO:IMPLEMENT READ TIME SOMEWHERE ELSE*/}
          {/* <span>6 min read</span> */}
          {/* <span>{moment(post_created_at).format("MMM Do YYYY")}</span> */}
          {children}
        </div>
      </div>
    </div>
  )
}
