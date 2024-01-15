import { Session } from "@supabase/auth-helpers-nextjs"

import useAuthModal from "@/hooks/use-auth-modal-store"

import { Icons } from "../../icons/icons"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Skeleton } from "../../ui/skeleton"

const UserAvatar = ({ session }: { session: Session | null }) => {
  const OpenModal = useAuthModal((state) => state.OpenModal)

  return (
    <Avatar
      className="cursor-pointer items-center justify-center outline-none"
      onClick={OpenModal}
    >
      {session ? (
        <>
          <AvatarImage
            src={session.user?.user_metadata?.avatar_url}
            alt="User Avatar Image"
          />
          <AvatarFallback>
            {session.user?.user_metadata?.avatar_url ? (
              <Skeleton className="h-12 w-12 rounded-full" />
            ) : (
              session.user.email!.substring(0, 2).toUpperCase()
            )}
          </AvatarFallback>
        </>
      ) : (
        <Icons.user className="h-full w-full rounded-full p-2 dark:shadow-outline" />
      )}
    </Avatar>
  )
}

export default UserAvatar
