import getUserSession from "@/utils/actions"

import { Icons } from "../icons/icons"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const UserAvatar = async () => {
  const {
    data: { session },
  } = await getUserSession()

  return (
    <Avatar className="cursor-pointer outline-none">
      {session ? (
        <>
          <AvatarImage
            src={session.user?.user_metadata?.avatar_url}
            alt="User Avatar"
          />
          {session.user?.email ? (
            <AvatarFallback>
              {session.user.email.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          ) : (
            "?"
          )}
        </>
      ) : (
        <Icons.user size={40} />
      )}
    </Avatar>
  )
}

export default UserAvatar
