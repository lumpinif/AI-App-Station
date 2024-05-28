import React from "react"

import { userLayoutRoutes } from "@/config/routes/user-layout-routes"
import { cardVariants } from "@/lib/constants"
import { cn } from "@/lib/utils"
import useAccountModal from "@/hooks/use-account-modal-store"
import { Separator } from "@/components/ui/separator"
import SearchCommandDialogTrigger from "@/components/search-command-dialog/search-dialog-trigger"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { UserPagesNavLinksCard } from "@/app/(main)/user/_components/layout/user-pages-nav-links-card"

import EditProfileButton from "../avatar/edit-profile-button"
import { UserCard } from "../profile/user-card"
import SignOutButton from "../signout/sign-out-button"

const AccountModalContent = () => {
  const closeAccountModal = useAccountModal((state) => state.closeModal)

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
          "!mx-0 shadow-sm hover:shadow-md",
          cardVariants({ variant: "nav-links-card" })
        )}
      />

      <div className="bg-card rounded-lg shadow-sm hover:shadow-md">
        {userLayoutRoutes
          .filter((group) => group.group !== "Search")
          .map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {group.items.map((link, itemIndex) => (
                <React.Fragment key={itemIndex}>
                  <UserPagesNavLinksCard
                    link={link}
                    itemIndex={itemIndex}
                    className={cn(
                      "active:!rounded-lg",
                      cardVariants({ variant: "nav-links-card" }),
                      "group first:rounded-t-lg last:rounded-b-lg",
                      itemIndex !== group.items.length - 1 && "border-b"
                    )}
                    onClick={closeAccountModal}
                  />
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
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
