import { Separator } from "@/components/ui/separator"

import AuthModalTrigger from "../auth-modal/auth-modal-trigger"
import UserNameEmail from "../settings/layout/user-name-email"
import SignOutButton from "../signout/sign-out-button"
import EditProfileButton from "./edit-profile-button"

const UserCard = () => {
  return (
    <>
      <div className="p-8 outline-none">
        <div className="flex flex-col justify-start space-y-6 md:space-y-8 xl:space-y-10">
          <AuthModalTrigger className="h-20 w-20 sm:h-32 sm:w-32" />
          <UserNameEmail />
          <Separator />
          <footer className="flex justify-between">
            <EditProfileButton />
            <SignOutButton />
          </footer>
        </div>
      </div>
    </>
  )
}

export default UserCard
