import getUserSession from "@/utils/actions"

import { Icons } from "../icons/icons"
import { Avatar } from "../ui/avatar"

const UserAvatar = async () => {
  const {
    data: { session },
  } = await getUserSession()

  return (
    <>
      <Avatar className="cursor-pointer outline-none">
        <Icons.user size={40} />
      </Avatar>
    </>
  )
}

export default UserAvatar
