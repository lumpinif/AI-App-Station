import { Link2 } from "lucide-react"

import { Profile } from "@/types/db_tables"

type UserWebsiteProps = {
  user_website?: Profile["user_website"]
}

export const UserWebsite: React.FC<UserWebsiteProps> = ({ user_website }) => {
  if (user_website)
    return (
      <div className="text-muted-foreground flex items-center gap-x-1 font-light sm:gap-x-2">
        <Link2 className="size-4 rotate-45" />
        <UserWebsiteLink user_website={user_website} />
      </div>
    )
}

const UserWebsiteLink = ({ user_website }: UserWebsiteProps) => {
  return (
    <div className="text-blue-400 underline-offset-2 hover:text-blue-500 hover:underline">
      <a href={`${user_website}`} target="_blank" rel="noopener noreferrer">
        {user_website &&
          user_website.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")}
      </a>
    </div>
  )
}
