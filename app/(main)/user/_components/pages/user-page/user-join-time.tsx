import { CalendarDays } from "lucide-react"
import moment from "moment"

import { Profile } from "@/types/db_tables"

type UserJoinTimeProps = {
  created_at?: Profile["created_at"]
}

export const UserJoinTime: React.FC<UserJoinTimeProps> = ({ created_at }) => {
  return (
    <div className="text-muted-foreground flex items-center gap-x-1 font-light sm:gap-x-2">
      <CalendarDays className="size-4" />
      <div className="max-w-lg text-balance leading-relaxed">
        Joined {created_at && moment(created_at).format("MMMM YYYY")}
      </div>
    </div>
  )
}
