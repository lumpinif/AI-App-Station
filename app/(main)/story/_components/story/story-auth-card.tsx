import moment from "moment"

import { Posts, Profiles } from "@/types/db_tables"
import { AvatarIcon } from "@/components/auth/avatar/avatar-icon"

import { UserHoverCard } from "./user-hover-card"

type AuthorCardProps = {
  author: Profiles
  views_count?: Posts["views_count"]
  post_created_at: Posts["created_at"]
}

export const AuthorCard: React.FC<AuthorCardProps> = ({
  author,
  views_count,
  post_created_at,
}) => {
  return (
    <div className="flex items-center gap-x-2 sm:gap-x-4">
      <UserHoverCard profile={author} sideOffset={10} align="start">
        <AvatarIcon profile={author} className="size-14 select-none" />
      </UserHoverCard>
      <div className="flex flex-col">
        <UserHoverCard profile={author} sideOffset={10} align="start">
          <div className="font-semibold underline-offset-4 hover:cursor-pointer hover:underline">
            {author.full_name}
          </div>
        </UserHoverCard>
        <div className="text-muted-foreground flex items-center gap-x-2">
          {/* TODO: IMPLEMENT VIEWS_COUNT FOR THE POST */}
          {/* {views_count && <span>{views_count}</span>} */}
          {/* TODO:IMPLEMENT READ TIME */}
          {/* <span>6 min read</span> */}
          <span>{moment(post_created_at).format("MMM Do YYYY")}</span>
        </div>
      </div>
    </div>
  )
}
