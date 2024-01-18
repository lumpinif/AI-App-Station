import { Session } from "@supabase/auth-helpers-nextjs"

import { Separator } from "@/components/ui/separator"

import UserNameEmail from "../settings/layout/user-name-email"
import SignOutButton from "../signout/sign-out-button"
import EditProfileButton from "./edit-profile-button"
import UserAvatar from "./user-avatar"

interface UserCardProps {
  session: Session | null
}

const UserCard = ({ session }: UserCardProps) => {
  return (
    <>
      <div className="p-8 outline-none">
        {session && (
          <div className="flex flex-col justify-start space-y-6 md:space-y-8 xl:space-y-10">
            <UserAvatar
              session={session}
              className="h-20 w-20 sm:h-32 sm:w-32"
            />
            <UserNameEmail session={session} />
            <Separator />
            <footer className="flex justify-between">
              <EditProfileButton />
              <SignOutButton />
            </footer>
          </div>
        )}
      </div>
    </>
  )
}

export default UserCard
