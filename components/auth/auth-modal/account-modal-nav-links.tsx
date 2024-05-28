import React from "react"

import { userLayoutRoutes } from "@/config/routes/user-layout-routes"
import { cardVariants } from "@/lib/constants"
import { cn } from "@/lib/utils"
import useAccountModal from "@/hooks/use-account-modal-store"
import { UserPagesNavLinksCard } from "@/app/(main)/user/_components/layout/user-pages-nav-links-card"

type AccountModalNavLinksProps = {
  ClassName?: string
}

export const AccountModalNavLinks: React.FC<AccountModalNavLinksProps> = ({
  ClassName,
}) => {
  const closeAccountModal = useAccountModal((state) => state.closeModal)

  return (
    <div
      className={cn("bg-card rounded-lg shadow-sm hover:shadow-md", ClassName)}
    >
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
  )
}
