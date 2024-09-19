import React from "react"

import { USERPAGESNAVROUTES } from "@/config/routes/site-routes"
import { cn } from "@/lib/utils"
import { cardVariants } from "@/lib/variants"
import useUserProfile from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"
import { UserPagesNavLinksCard } from "@/app/(main)/user/_components/layout/user-pages-nav-links-card"

type AccountModalNavLinksProps = {
  className?: string
}

export const AccountModalNavLinks: React.FC<AccountModalNavLinksProps> = ({
  className,
}) => {
  const closeAccountModal = useAccountModal((state) => state.closeModal)
  const { data: profile } = useUserProfile()
  const userRole = profile?.profile_role?.role

  const filteredRoutes = USERPAGESNAVROUTES.filter((link) => {
    if (link.title.toLowerCase() === "search") return false
    if (link.roleAllowed) {
      return link.roleAllowed.includes(
        userRole as "admin" | "super_admin" | "super_user"
      )
    }
    return true
  })

  return (
    <div
      className={cn(
        "rounded-lg transition-all duration-150 ease-out max-sm:shadow-sm sm:space-y-1 sm:bg-transparent",
        className
      )}
    >
      {filteredRoutes.map((link, index) => (
        <UserPagesNavLinksCard
          key={index}
          link={link}
          itemIndex={index}
          className={cn(
            "active:!rounded-lg",
            cardVariants({
              variant: "nav-links-card",
              className: "max-sm:active:my-1 sm:bg-transparent",
            }),
            "group first:rounded-t-lg last:rounded-b-lg",
            index !== filteredRoutes.length - 1 && "border-b sm:border-0"
          )}
          onClick={closeAccountModal}
        />
      ))}
    </div>
  )
}
