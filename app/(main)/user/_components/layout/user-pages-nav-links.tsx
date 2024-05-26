import React from "react"
import Link from "next/link"

import { userLayoutRoutes } from "@/config/routes/user-layout-routes"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import SearchCommandDialogTrigger from "@/components/search-command-dialog/search-dialog-trigger"

type UserPagesNavLinksProps = {
  withSeparator?: boolean
  isCollapsed?: boolean
}

export const UserPagesNavLinks: React.FC<UserPagesNavLinksProps> = ({
  withSeparator = true,
  isCollapsed,
}) => {
  return (
    <nav className="text-muted-foreground grid gap-4 group-[[data-collapsed=true]]:justify-center">
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
                  <Tooltip key={itemIndex} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          buttonVariants({
                            variant: "ghost",
                            size: "icon",
                          })
                        )}
                      >
                        <link.icon className="stroke-[1.5px]" />
                        <span className="sr-only">{link.title}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="dark:bg-foreground dark:text-background flex items-center gap-2 text-xs"
                    >
                      {link.title}
                      {link.label && (
                        <span className="text-muted-foreground ml-auto">
                          {link.label}
                        </span>
                      )}
                    </TooltipContent>
                  </Tooltip>
                )}
              </React.Fragment>
            ) : (
              // if link is not Search
              <React.Fragment key={itemIndex}>
                {link.title === "Search" ? (
                  <SearchCommandDialogTrigger
                    triggerClassName={cn(
                      "text-muted-foreground mx-2 text-nowrap font-normal",
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "justify-start"
                    )}
                    withTooltip={false}
                  >
                    <link.icon className="mr-2 stroke-[1.5px] md:size-6" />
                    <span className="font-normal">{link.title}</span>
                    {link.label && (
                      <span
                        className={cn(
                          "text-muted-foreground ml-auto font-normal"
                        )}
                      >
                        {link.label}
                      </span>
                    )}
                  </SearchCommandDialogTrigger>
                ) : (
                  <Link
                    key={itemIndex}
                    href={link.href}
                    className={cn(
                      "text-muted-foreground mx-2 text-nowrap font-normal",
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "justify-start"
                    )}
                  >
                    <link.icon className="mr-2 stroke-[1.5px] md:size-6" />
                    <span className="font-normal">{link.title}</span>
                    {link.label && (
                      <span
                        className={cn(
                          "text-muted-foreground ml-auto font-normal"
                        )}
                      >
                        {link.label}
                      </span>
                    )}
                  </Link>
                )}
              </React.Fragment>
            )
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
