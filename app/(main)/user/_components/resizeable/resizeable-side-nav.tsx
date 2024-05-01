"use client"

import React from "react"
import Link from "next/link"
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  LucideIcon,
  Upload,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import AccountModalTrigger from "@/components/auth/auth-modal/account-modal-trigger"
import { UserCard } from "@/components/auth/auth-modal/user-card"

type NavProps = {
  isCollapsed: boolean
  links: {
    group: string
    items: {
      title: string
      label?: string
      href: string
      icon: LucideIcon
    }[]
  }[]
  handleResizeHandleClick?: () => void
}

export const ResizeableSideNav: React.FC<NavProps> = ({
  links,
  isCollapsed,
  handleResizeHandleClick,
}) => {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex h-full flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      {isCollapsed && (
        <div className="grid gap-4 group-[[data-collapsed=true]]:justify-center">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "cursor-pointer",
                  buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })
                )}
                onClick={handleResizeHandleClick}
              >
                <ArrowRightFromLine className="text-muted-foreground  stroke-[1.5px]" />
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="dark:bg-foreground dark:text-background flex items-center gap-2 text-xs"
            >
              Toggle Sidebar
            </TooltipContent>
          </Tooltip>
        </div>
      )}
      <div className="grid gap-4 group-[[data-collapsed=true]]:justify-center">
        {isCollapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href="/user"
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })
                )}
              >
                <AccountModalTrigger className="size-8 rounded-md" />
                <span className="sr-only">user account modal trigger</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="dark:bg-foreground dark:text-background flex items-center gap-2 text-xs"
            >
              Account
            </TooltipContent>
          </Tooltip>
        ) : (
          <UserCard
            className={cn(
              "mx-2",
              buttonVariants({ variant: "ghost", size: "sm" }),
              "flex items-center justify-start"
            )}
            modalTriggerCN="mr-2 lg:size-8 md:size-6 rounded-md"
            avatarCN="size-full rounded-md"
            profileNameCN="text-primary text-xs"
            profileEmailCN="text-muted-foreground text-xs"
          />
        )}
      </div>
      <nav className="grid gap-4 group-[[data-collapsed=true]]:justify-center">
        {links.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {groupIndex > 0 && !isCollapsed && <Separator />}
            {group.items.map((link, itemIndex) =>
              isCollapsed ? (
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
                      <link.icon className="text-muted-foreground stroke-[1.5px]" />
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
              ) : (
                <Link
                  key={itemIndex}
                  href={link.href}
                  className={cn(
                    "text-muted-foreground mx-2 text-nowrap",
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "justify-start"
                  )}
                >
                  <link.icon className="text-muted-foreground mr-2 stroke-[1px] md:size-6 lg:size-8" />
                  {link.title}
                  {link.label && (
                    <span className={cn("text-muted-foreground ml-auto")}>
                      {link.label}
                    </span>
                  )}
                </Link>
              )
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  )
}
