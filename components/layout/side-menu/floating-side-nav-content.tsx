import React, { memo, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { SIDENAVROUTESProps, SideNavItemProps } from "@/config/routes"
import { cn } from "@/lib/utils"
import useSideNav from "@/hooks/use-side-nav-store"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible"
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip"

type FloatingSideNavContentProps = {
  items: SIDENAVROUTESProps
  isOpen?: boolean
}

export const FloatingSideNavContent: React.FC<FloatingSideNavContentProps> =
  memo(({ items, isOpen }) => {
    const OpenSideNav = useSideNav((state) => state.OpenSideNav)
    const CloseSideNav = useSideNav((state) => state.CloseSideNav)
    const pathname = usePathname()

    useEffect(() => {
      CloseSideNav()
    }, [pathname, CloseSideNav])

    return (
      <div className="w-full">
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
    )
  })

FloatingSideNavContent.displayName = "FloatingSideNavContent"

type FloatingSideNavCollapsibleContentProps = {
  items: SideNavItemProps[]
  isOpen?: boolean
  pathname?: string
}

export const FloatingSideNavCollapsibleContent: React.FC<FloatingSideNavCollapsibleContentProps> =
  memo(({ items, pathname, isOpen }) => {
    return (
      <div className="relative inline-flex flex-col gap-2.5 p-2.5 transition-all duration-300 ease-in">
        {items.map((item, index) =>
          item.href && !item.disabled ? (
            <Link
              href={item.href}
              key={index}
              className={cn(
                "flex w-full items-center rounded-md px-2 py-1 hover:text-foreground/80 hover:underline dark:hover:bg-background/50 dark:hover:no-underline dark:hover:shadow-outline",
                item.disabled && "cursor-not-allowed opacity-60",
                pathname === item.href
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <ItemContent item={item} isOpen={isOpen} />
            </Link>
          ) : (
            <span
              key={index}
              className={cn(
                "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
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
  item: SideNavItemProps
  isOpen?: boolean
}

const ItemContent: React.FC<ItemContentProps> = ({ item, isOpen }) => {
  return (
    <>
      <div className="flex w-full items-center justify-between gap-4 text-nowrap">
        <div className="flex items-center gap-2">
          {item.icon && (
            <div className="flex h-5 w-5 items-center group-hover:text-foreground">
              {item.icon}
            </div>
          )}
          {isOpen && <div>{item.title}</div>}
        </div>

        {item.shortcutNumber && isOpen && (
          <kbd className="pointer-events-none flex h-5 w-5 select-none items-center justify-center rounded bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 dark:bg-muted-foreground/30">
            <span className="text-xs">{item.shortcutNumber}</span>
          </kbd>
        )}
      </div>
      {item.label && isOpen && (
        <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-black no-underline group-hover:no-underline">
          {item.label}
        </span>
      )}
    </>
  )
}

type FloatingSideNavCollapsibleProps = {
  children: React.ReactNode
  item: SideNavItemProps
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
          <div className="flex items-center">
            <CollapsibleTrigger asChild>
              <TooltipTrigger asChild>
                <button className="flex h-12 w-12 translate-x-1.5 items-center justify-center rounded-full text-muted-foreground outline-none transition-all duration-300 ease-in hover:cursor-pointer hover:bg-foreground/10 hover:text-foreground">
                  {item.icon}
                  <span className="sr-only">{item.title}</span>
                </button>
              </TooltipTrigger>
            </CollapsibleTrigger>
            {isOpen ? (
              <Link
                href={`${item.href}` || "/"}
                className="absolute right-4 origin-left select-none text-nowrap text-sm font-medium text-foreground hover:cursor-pointer hover:text-foreground/80"
              >
                {item.title}
              </Link>
            ) : (
              <TooltipContent
                side="right"
                className="flex items-center gap-4 dark:bg-foreground dark:text-background"
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
