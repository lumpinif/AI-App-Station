"use client"

import React from "react"
import Link from "next/link"
import { ArrowRightFromLine, LucideIcon } from "lucide-react"

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
              <kbd className="bg-muted dark:bg-muted-foreground/60 pointer-events-none right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded px-1.5 font-mono  text-[10px] opacity-100 sm:flex">
                <span className="text-xs">⌘</span>space
              </kbd>
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
                  "cursor-pointer",
                  buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })
                )}
              >
                <AccountModalTrigger
                  className="size-8 cursor-pointer rounded-md"
                  avatarClassName="cursor-pointer"
                  isTriggerModal={false}
                />
                <span className="sr-only">user account modal trigger</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="dark:bg-foreground dark:text-background flex items-center gap-2 text-xs"
            >
              User Page
            </TooltipContent>
          </Tooltip>
        ) : (
          <UserCard
            isTriggerModal={false}
            className={cn(
              "mx-2",
              buttonVariants({ variant: "ghost", size: "sm" }),
              "flex items-center justify-start"
            )}
            accountModalTriggerCN="mr-2 md:size-6 rounded-md"
            avatarCN="size-full rounded-md"
            profileNameCN="text-primary text-xs"
            profileEmailCN="text-muted-foreground text-xs"
          />
        )}
      </div>

      <nav className="grid gap-4 group-[[data-collapsed=true]]:justify-center">
        {links.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {groupIndex > 0 && !isCollapsed && (
              <Separator className="bg-border/50 h-[0.5px]" />
            )}
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
                    "text-muted-foreground mx-2 text-nowrap font-normal",
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "justify-start"
                  )}
                >
                  <link.icon className="text-muted-foreground mr-2 stroke-[1.5px] md:size-6" />
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
              )
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  )
}
