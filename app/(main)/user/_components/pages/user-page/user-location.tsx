import { MapPin } from "lucide-react"

import { Profiles } from "@/types/db_tables"

type UserLocationProps = {
  user_location?: Profiles["user_location"]
}

export const UserLocation: React.FC<UserLocationProps> = ({
  user_location,
}) => {
  if (user_location)
    return (
      <div className="text-muted-foreground flex items-center gap-x-1 font-light sm:gap-x-2">
        <MapPin className="size-4" />
        <div className="max-w-lg text-balance leading-relaxed">
          {user_location}
        </div>
      </div>
    )
}
