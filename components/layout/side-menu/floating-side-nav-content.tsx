import React, { memo, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon as LucideIconType } from "lucide-react"

import { NavItemProps, SIDENAVROUTESProps } from "@/config/routes/main-routes"
import { cn } from "@/lib/utils"
import useSideNav from "@/hooks/use-side-nav-store"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible"
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip"
import { buttonClassBase } from "./floating-side-nav"

type FloatingSideNavContentProps = {
  items: SIDENAVROUTESProps
  isOpen?: boolean
}

export const FloatingSideNavContent: React.FC<FloatingSideNavContentProps> =
  memo(({ items, isOpen }) => {
    const OpenSideNav = useSideNav((state) => state.OpenSideNav)
    // const CloseSideNav = useSideNav((state) => state.CloseSideNav)
    const pathname = usePathname()

    // TODO: THIS IS USED TO CLOSE THE SIDENAV WHENEVER USE NAVIGATE TO OTHER PAGES
    // useEffect(() => {
    //   CloseSideNav()
    // }, [pathname, CloseSideNav])

    return (
      <div className="w-full">
        <div className="space-y-2.5">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative flex items-center justify-start transition-all duration-200 ease-linear"
              onClick={OpenSideNav}
            >
              <FloatingSideNavCollapsible item={item} isOpen={isOpen}>
                {item.items?.length > 0 && (
                  <FloatingSideNavCollapsibleContent
                    items={item.items}
                    pathname={pathname}
                    isOpen={isOpen}
                  />
                )}
              </FloatingSideNavCollapsible>
            </div>
          ))}
        </div>
      </div>
    )
  })

FloatingSideNavContent.displayName = "FloatingSideNavContent"

type FloatingSideNavCollapsibleContentProps = {
  items: NavItemProps[]
  isOpen?: boolean
  pathname?: string
}

export const FloatingSideNavCollapsibleContent: React.FC<FloatingSideNavCollapsibleContentProps> =
  memo(({ items, pathname, isOpen }) => {
    return (
      <div className="relative inline-flex w-full flex-col gap-2.5 p-2.5 transition-all duration-300 ease-in">
        {items.map((item, index) =>
          item.href && !item.disabled ? (
            <Link
              href={item.href}
              key={index}
              className={cn(
                "hover:text-foreground/80 dark:hover:bg-background/50 dark:hover:shadow-outline flex w-full items-center rounded-md px-2 py-1 hover:underline dark:hover:no-underline",
                item.disabled && "cursor-not-allowed opacity-60",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <ItemContent item={item} isOpen={isOpen} />
            </Link>
          ) : (
            <span
              key={index}
              className={cn(
                "text-muted-foreground flex w-full cursor-not-allowed items-center rounded-md p-2 hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              <ItemContent item={item} isOpen={isOpen} />
            </span>
          )
        )}
      </div>
    )
  })

FloatingSideNavCollapsibleContent.displayName =
  "FloatingSideNavCollapsibleContent"

type ItemContentProps = {
  item: NavItemProps
  isOpen?: boolean
}

const ItemContent: React.FC<ItemContentProps> = ({ item, isOpen }) => {
  return (
    <div className="flex min-w-full items-center justify-between gap-4 text-nowrap">
      <div className="flex items-center gap-2">
        {item.icon && (
          <div className="group-hover:text-foreground flex h-5 w-5 items-center">
            {item.title !== "GPTs" ? (
              <item.icon className="size-full stroke-[1.5]" />
            ) : (
              <item.icon size={26} />
            )}
          </div>
        )}
        {isOpen && <div>{item.title}</div>}
      </div>

      {item.shortcutNumber && isOpen && (
        <kbd className="bg-muted dark:bg-muted-foreground/30 pointer-events-none flex h-5 w-5 select-none items-center justify-center rounded px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">{item.shortcutNumber}</span>
        </kbd>
      )}
      {item.label && isOpen && (
        <span className="rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-black no-underline group-hover:no-underline">
          {item.label}
        </span>
      )}
    </div>
  )
}

type FloatingSideNavCollapsibleProps = {
  children: React.ReactNode
  item: NavItemProps
  isOpen?: boolean
}

const FloatingSideNavCollapsible: React.FC<FloatingSideNavCollapsibleProps> =
  memo(({ children, item, isOpen }) => {
    const [isCollapsible, setIsCollapsible] = useState(true)

    return (
      <Tooltip delayDuration={0}>
        <Collapsible
          open={isCollapsible && isOpen}
          onOpenChange={setIsCollapsible}
          className="w-[350px] space-y-2"
        >
          <div className="relative flex items-center justify-start">
            <CollapsibleTrigger asChild>
              <TooltipTrigger asChild>
                <button className={buttonClassBase}>
                  {item.icon && <item.icon className="size-6" />}
                  <span className="sr-only">{item.title}</span>
                </button>
              </TooltipTrigger>
            </CollapsibleTrigger>
            {isOpen ? (
              <Link
                href={`${item.href}` || "/"}
                className="text-foreground hover:text-foreground/80 absolute right-4 origin-left select-none text-nowrap text-sm hover:cursor-pointer"
              >
                {item.title}
              </Link>
            ) : (
              <TooltipContent
                side="right"
                className="dark:bg-foreground dark:text-background flex items-center gap-4"
              >
                {item.title}
              </TooltipContent>
            )}
          </div>
          <CollapsibleContent className="space-y-2">
            {children}
          </CollapsibleContent>
        </Collapsible>
      </Tooltip>
    )
  })

FloatingSideNavCollapsible.displayName = "FloatingSideNavCollapsible"
