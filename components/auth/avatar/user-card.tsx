import { Session } from "@supabase/auth-helpers-nextjs"

import { Separator } from "@/components/ui/separator"

import SignOutButton from "../signout/sign-out-button"
import UserAvatar from "./auth-avatar"
import EditProfileButton from "./edit-profile-button"

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
            <div>
              <h2 className="text-3xl font-bold  tracking-tight sm:text-4xl">
                {session.user?.user_metadata?.full_name || session.user?.email}
              </h2>
              <p className="text-muted-foreground">{session.user?.email}</p>
            </div>
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
