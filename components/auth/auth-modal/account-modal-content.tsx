import { cardVariants } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import SearchCommandDialogTrigger from "@/components/search-command-dialog/search-dialog-trigger"
import { ThemeToggle } from "@/components/theme/theme-toggle"

import { UserCard } from "../profile/user-card"
import SignOutButton from "../signout/sign-out-button"
import { AccountModalNavLinks } from "./account-modal-nav-links"
import EditProfileModal from "./edit-profile-modal"

const AccountModalContent = () => {
  return (
    <div className="flex flex-col justify-start space-y-8 p-6 transition-all duration-150 ease-out">
      <UserCard
        accountModalTriggerCN="size-14"
        className={cn(cardVariants({ variant: "user-card" }))}
        profileNameCN="text-lg font-normal sm:text-xl"
        profileEmailCN="text-muted-foreground font-light tracking-wide"
      />

      <SearchCommandDialogTrigger
        iconClassName="stroke-[1.5px]"
        isCollapsed={false}
        withTooltip={false}
        triggerCN={cn(
          cardVariants({
            variant: "nav-links-card",
            className: "!mx-0 !px-4 shadow-sm hover:shadow-md",
          })
        )}
      />

      <AccountModalNavLinks />

      <EditProfileModal />

      <SignOutButton
        className={cn(
          cardVariants({
            variant: "nav-links-card",
            className: "rounded-lg text-primary font-normal",
          })
        )}
      />

      <footer className="flex justify-end">
        <ThemeToggle />
      </footer>
    </div>
  )
}

export default AccountModalContent
