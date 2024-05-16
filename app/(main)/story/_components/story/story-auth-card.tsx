import { Profiles } from "@/types/db_tables"
import { AvatarIcon } from "@/components/auth/avatar/avatar-icon"

import { UserHoverCard } from "./user-hover-card"

type AuthorCardProps = {
  author: Profiles
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
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
          <span>6 min read</span>
          <span>Apr 18, 2024</span>
        </div>
      </div>
    </div>
  )
}
