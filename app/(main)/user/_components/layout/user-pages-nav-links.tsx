import React from "react"

import { userLayoutRoutes } from "@/config/routes/user-layout-routes"
import { checkIsSuperUser, checkIsUserAdmin, cn } from "@/lib/utils"
import useUserProfile from "@/hooks/react-hooks/use-user"
import { Separator } from "@/components/ui/separator"
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

  const isAdmin = checkIsUserAdmin(userRole)
  const isSuperUser = checkIsSuperUser(userRole)

  return (
    <nav
      className={cn(
        "grid gap-4 text-muted-foreground group-[[data-collapsed=true]]:justify-center",
        className
      )}
    >
      {userLayoutRoutes.map((group, groupIndex) => (
        <React.Fragment key={groupIndex}>
          {groupIndex > 0 && !isCollapsed && withSeparator && (
            <Separator className="h-[0.5px] bg-border/50" />
          )}
          {group.items.map((link, itemIndex) =>
            isCollapsed ? ( // if collapsed
              // if link is search
              <React.Fragment key={itemIndex}>
                {link.title === "Search" ? (
                  <SearchCommandDialogTrigger iconClassName="stroke-[1.5px]" />
                ) : link.title === "Daily Posts" && (isAdmin || isSuperUser) ? (
                  <UserPagesNavLinksIcon link={link} itemIndex={itemIndex} />
                ) : link.title !== "Daily Posts" ? (
                  <UserPagesNavLinksIcon link={link} itemIndex={itemIndex} />
                ) : null}
              </React.Fragment>
            ) : (
              <React.Fragment key={itemIndex}>
                {link.title === "Search" ? (
                  <SearchCommandDialogTrigger
                    isCollapsed={false}
                    withTooltip={false}
                  />
                ) : link.title === "Daily Posts" && (isAdmin || isSuperUser) ? (
                  <UserPagesNavLinksCard
                    itemIndex={itemIndex}
                    link={link}
                    className={UserPagesNavLinksCardCN}
                  />
                ) : link.title !== "Daily Posts" ? (
                  <UserPagesNavLinksCard
                    itemIndex={itemIndex}
                    link={link}
                    className={UserPagesNavLinksCardCN}
                  />
                ) : null}
              </React.Fragment>
            )
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
