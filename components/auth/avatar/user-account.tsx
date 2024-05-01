import { cardVariants } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme/theme-toggle"

import { UserCard } from "../auth-modal/user-card"
import SignOutButton from "../signout/sign-out-button"
import EditProfileButton from "./edit-profile-button"

const UserAccount = () => {
  return (
    <div className="p-8 outline-none">
      <div className="flex flex-col justify-start space-y-6 md:space-y-8 xl:space-y-10">
        <UserCard
          className={cn(cardVariants({ variant: "user-card" }))}
          modalTriggerCN="size-14"
          profileNameCN="text-lg font-medium sm:text-xl"
          profileEmailCN="text-muted-foreground tracking-wide"
        />
        <Separator />
        <footer className="flex justify-between">
          <EditProfileButton />
          <SignOutButton />
        </footer>
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default UserAccount
