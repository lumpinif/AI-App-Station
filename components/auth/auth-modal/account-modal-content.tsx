import { cardVariants } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { UserPagesNavLinks } from "@/app/(main)/user/_components/layout/user-pages-nav-links"

import EditProfileButton from "../avatar/edit-profile-button"
import { UserCard } from "../profile/user-card"
import SignOutButton from "../signout/sign-out-button"

const AccountModalContent = () => {
  return (
    <div className="flex flex-col justify-start space-y-6 p-8 md:space-y-8 xl:space-y-10">
      <UserCard
        className={cn(cardVariants({ variant: "user-card" }))}
        accountModalTriggerCN="size-14"
        profileNameCN="text-lg font-medium sm:text-xl"
        profileEmailCN="text-muted-foreground tracking-wide"
      />
      <div className="border">
        <UserPagesNavLinks withSeparator={false} />
      </div>
      <Separator />
      <footer className="flex justify-between">
        <EditProfileButton />
        <SignOutButton variant={"destructive"} />
      </footer>
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
    </div>
  )
}

export default AccountModalContent
