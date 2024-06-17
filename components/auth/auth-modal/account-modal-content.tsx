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
        profileNameCN="text-lg font-normal sm:text-xl"
        className={cn(
          cardVariants({
            variant: "user-card",
            className: "max-sm:shadow-sm sm:bg-transparent sm:shadow-none",
          })
        )}
        profileEmailCN="text-muted-foreground font-light tracking-wide"
      />

      <SearchCommandDialogTrigger
        iconClassName="stroke-[1.5px]"
        isCollapsed={false}
        withTooltip={false}
        triggerCN={cn(
          cardVariants({
            variant: "nav-links-card",
            className:
              "!mx-0 !px-4 max-sm:shadow-sm hover:shadow-md sm:bg-transparent",
          })
        )}
      />

      <AccountModalNavLinks />

      <EditProfileModal
        size={"default"}
        variant={"default"}
        className={cn(
          "text-primary",
          cardVariants({
            variant: "nav-links-card",
            className:
              "justify-center rounded-lg sm:hidden sm:bg-transparent sm:shadow-none",
          })
        )}
      />

      <SignOutButton
        className={cn(
          cardVariants({
            variant: "nav-links-card",
            className:
              "rounded-lg font-normal text-red-600 hover:text-red-500 dark:text-red-500 sm:hidden sm:bg-transparent sm:text-destructive",
          })
        )}
      />

      <footer className="flex justify-between">
        <span className="flex items-center gap-x-2">
          <EditProfileModal
            size={"label"}
            variant={"ghost"}
            className="max-sm:hidden"
          />
          <SignOutButton
            size={"label"}
            variant={"ghost"}
            className={cn(
              "w-20 rounded-lg font-normal text-red-600 hover:text-red-500 dark:text-red-500 max-sm:hidden"
            )}
          />
        </span>
        <ThemeToggle />
      </footer>
    </div>
  )
}

export default AccountModalContent
