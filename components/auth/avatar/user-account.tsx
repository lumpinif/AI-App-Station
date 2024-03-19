import { cardVariants } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import UserCard from "@/app/(main)/today/_components/widgets-grid/user-card"

import SignOutButton from "../signout/sign-out-button"
import EditProfileButton from "./edit-profile-button"

const UserAccount = () => {
  return (
    <>
      <div className="p-8 outline-none">
        <div className="flex flex-col justify-start space-y-6 md:space-y-8 xl:space-y-10">
          <UserCard className="" />
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

export default UserAccount
