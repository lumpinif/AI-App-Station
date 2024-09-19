import React from "react"

import { USERPAGESNAVROUTES } from "@/config/routes/site-routes"
import { cn } from "@/lib/utils"
import useUserProfile from "@/hooks/react-hooks/use-user"
import SearchCommandDialogTrigger from "@/components/search-command-dialog/search-dialog-trigger"

import { UserPagesNavLinksIcon } from "./use-pages-nav-links-icon"
import { UserPagesNavLinksCard } from "./user-pages-nav-links-card"

type UserPagesNavLinksProps = {
  className?: string
  isCollapsed?: boolean
  withSeparator?: boolean
  UserPagesNavLinksCardCN?: string
}

export const UserPagesNavLinks: React.FC<UserPagesNavLinksProps> = ({
  className,
  isCollapsed,
  withSeparator = true,
  UserPagesNavLinksCardCN,
}) => {
  const { data: profile } = useUserProfile()
  const userRole = profile?.profile_role?.role

  const filteredRoutes = USERPAGESNAVROUTES.filter((link) => {
    if (link.roleAllowed) {
      return link.roleAllowed.includes(
        userRole as "admin" | "super_admin" | "super_user"
      )
    }
    return true
  })

  return (
    <nav
      className={cn(
        "grid gap-4 text-muted-foreground group-[[data-collapsed=true]]:justify-center",
        className
      )}
    >
      {filteredRoutes.map((link, itemIndex) =>
        isCollapsed ? (
          <React.Fragment key={itemIndex}>
            {link.title.toLowerCase() === "search" ? (
              <SearchCommandDialogTrigger iconClassName="stroke-[1.5px]" />
            ) : (
              <UserPagesNavLinksIcon link={link} itemIndex={itemIndex} />
            )}
          </React.Fragment>
        ) : (
          <React.Fragment key={itemIndex}>
            {link.title.toLowerCase() === "search" ? (
              <SearchCommandDialogTrigger
                isCollapsed={false}
                withTooltip={false}
              />
            ) : (
              <UserPagesNavLinksCard
                itemIndex={itemIndex}
                link={link}
                className={UserPagesNavLinksCardCN}
              />
            )}
          </React.Fragment>
        )
      )}
    </nav>
  )
}
