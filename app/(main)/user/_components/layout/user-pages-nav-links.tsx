import React from "react"

import { userLayoutRoutes } from "@/config/routes/user-layout-routes"
import { cn } from "@/lib/utils"
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
  return (
    <nav
      className={cn(
        "text-muted-foreground grid gap-4 group-[[data-collapsed=true]]:justify-center",
        className
      )}
    >
      {userLayoutRoutes.map((group, groupIndex) => (
        <React.Fragment key={groupIndex}>
          {groupIndex > 0 && !isCollapsed && withSeparator && (
            <Separator className="bg-border/50 h-[0.5px]" />
          )}
          {group.items.map((link, itemIndex) =>
            isCollapsed ? ( // if collapsed
              // if link is search
              <React.Fragment key={itemIndex}>
                {link.title === "Search" ? (
                  <SearchCommandDialogTrigger iconClassName="stroke-[1.5px]" />
                ) : (
                  <UserPagesNavLinksIcon link={link} itemIndex={itemIndex} />
                )}
              </React.Fragment>
            ) : (
              <React.Fragment key={itemIndex}>
                {link.title === "Search" ? (
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
        </React.Fragment>
      ))}
    </nav>
  )
}
