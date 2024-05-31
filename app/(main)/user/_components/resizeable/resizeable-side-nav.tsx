"use client"

import React from "react"
import Link from "next/link"
import { ArrowRightFromLine } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import PopoverMenu from "@/components/ui/popover-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import AccountModalTrigger from "@/components/auth/auth-modal/account-modal-trigger"
import { UserCard } from "@/components/auth/profile/user-card"

import { UserPagesNavLinks } from "../layout/user-pages-nav-links"

type NavProps = {
  isCollapsed: boolean
  handleResizeHandleClick?: () => void
}

export const ResizeableSideNav: React.FC<NavProps> = ({
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
                <ArrowRightFromLine className="stroke-[1.5px]  text-muted-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="flex items-center gap-2 text-xs dark:bg-foreground dark:text-background"
            >
              Toggle Sidebar
              <kbd className="pointer-events-none right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px]  opacity-100 dark:bg-muted-foreground/60 sm:flex">
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
              className="flex items-center gap-2 text-xs dark:bg-foreground dark:text-background"
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

      <UserPagesNavLinks isCollapsed={isCollapsed} />
      <PopoverMenu className="absolute bottom-12 left-5" />
    </div>
  )
}
