import React, { memo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NavItemProps } from "@/config/routes/site-routes"
import { cn } from "@/lib/utils"
import useSideNav from "@/hooks/use-side-nav-store"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip"
import { buttonClassBase } from "./floating-side-nav"

type FloatingSideNavContentProps = {
  items: NavItemProps[]
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
      <div className="w-full border">
        <div className="space-y-2.5">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative flex items-center justify-start transition-all duration-200 ease-linear"
              onClick={OpenSideNav}
            >
              <FloatingSideNavCollapsible item={item} isOpen={isOpen}>
                {item.items && item.items?.length > 0 && (
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
                "flex w-full items-center rounded-md px-2 py-1 transition-all duration-150 ease-in-out hover:text-foreground/80 hover:underline dark:hover:bg-background/50 dark:hover:no-underline dark:hover:shadow-outline",
                item.disabled && "cursor-not-allowed opacity-60",
                pathname === item.href
                  ? "text-foreground dark:bg-background/50 dark:shadow-outline"
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
  item: NavItemProps
  isOpen?: boolean
}

const ItemContent: React.FC<ItemContentProps> = ({ item, isOpen }) => {
  return (
    <div className="flex min-w-full items-center justify-between gap-4 text-nowrap">
      <div className="flex items-center gap-2">
        {item.icon && (
          <div className="flex h-5 w-5 items-center group-hover:text-foreground">
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
        <kbd className="pointer-events-none flex h-5 w-5 select-none items-center justify-center rounded bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 dark:bg-muted-foreground/30">
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
      <TooltipProvider>
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
                  className="absolute right-4 origin-left select-none text-nowrap text-sm text-foreground hover:cursor-pointer hover:text-foreground/80"
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
      </TooltipProvider>
    )
  })

FloatingSideNavCollapsible.displayName = "FloatingSideNavCollapsible"
