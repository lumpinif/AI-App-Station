"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { MAINROUTES } from "@/config/routes/main-routes"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"
import SearchCommandDialogTrigger from "@/components/search-command-dialog/search-dialog-trigger"

import NavAuthDropdown from "./nav-auth-dropdown"
import { SiteIcon, SiteLogo } from "./site-header"

export function NavigationMenuBar() {
  const currentPath = usePathname()
  return (
    <NavigationMenu>
      <NavigationMenuList className="glass-card-background mx-2 h-14 rounded-full p-2 px-4 text-foreground backdrop-blur-lg transition-all duration-500 ease-in-out hover:opacity-100 dark:shadow-outline">
        <NavigationMenuItem className="rounded-full">
          <SiteLogo
            className="w-full px-2 pr-4 sm:w-full"
            linkCN="page-title-font inline animate-magic-fade-in text-balance bg-gradient-to-r hover:from-primary hover:to-primary hover:via-primary from-primary/75 via-primary to-primary/75 bg-clip-text !leading-tight text-transparent opacity-0 transition-all duration-500 ease-out [--animation-delay:500ms] dark:from-zinc-300 dark:via-zinc-400 dark:to-zinc-300 text-sm dark:from-10% dark:via-40% dark:to-100% hover:dark:from-zinc-300 hover:dark:via-zinc-300 hover:dark:to-zinc-300"
          />
        </NavigationMenuItem>

        <NavigationMenuItem className="relative h-full rounded-full px-1">
          <Separator
            orientation="vertical"
            className="absolute bottom-1/2 top-1/2 h-1/2 -translate-y-1/2"
          />
        </NavigationMenuItem>

        <NavigationMenuItem className="rounded-full">
          <NavigationMenuTrigger className="bg-transparent">
            Getting started
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild className="">
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none hover:cursor-pointer"
                    href="/"
                  >
                    <SiteIcon />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      {siteConfig.name}
                    </div>
                    <p className="text-sm leading-tight dark:text-muted-foreground">
                      {siteConfig.description}
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/today" title="Today">
                AI News of the Day, and AI App of the Day. Carefully curated by
                talented authors and creators. Daily updated.
              </ListItem>
              <ListItem href="/ai-apps" title="AI Apps">
                Useful AI Apps submitted by talented authors and creators like
                you. Updated, prospective and active.
              </ListItem>
              <ListItem href="/stories" title="Stories">
                Brilliant stories about AI, written by talented authors and
                creators
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {MAINROUTES.filter((route) => route.inMainNav).map((route) => (
          <NavigationMenuItem
            key={route.id}
            className="cursor-pointer select-none"
          >
            {route.href !== "/search" && (
              <Link
                href={`${route.href}`}
                className={cn(navigationMenuTriggerStyle(), {
                  "!text-blue-500": currentPath.includes(`${route.href}`),
                })}
              >
                {route.title}
              </Link>
            )}
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem className="rounded-full">
          <SearchCommandDialogTrigger
            sideOffset={15}
            tooltipSide="bottom"
            className="flex items-center justify-center rounded-full"
          />
        </NavigationMenuItem>

        {/* <NavMenuAuthDropdown /> */}
        <NavAuthDropdown />
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={`${ref}`}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
