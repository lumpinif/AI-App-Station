"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { MAINROUTES } from "@/config/routes"
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
import { Icons } from "@/components/icons/icons"
import SearchDialogTrigger from "@/components/shared/search-dialog-trigger"
import { DirectThemeToggle } from "@/components/theme/direct-theme-toggle"

export function NavigationMenuBar() {
  const currentPath = usePathname()
  return (
    <NavigationMenu>
      <NavigationMenuList className="glass-card-background mx-2 h-14 rounded-full p-2 text-foreground/80 bg-blend-luminosity backdrop-blur-lg transition-all duration-500 ease-in-out hover:opacity-100 dark:shadow-outline">
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
                    <Icons.logo className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      AI App Station
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components that you can copy and
                      paste into your apps. Accessible. Customizable. Open
                      Source.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {MAINROUTES.map((route) => (
          <NavigationMenuItem key={route.id}>
            {route.href !== "/search" && (
              <Link href={`${route.href}`} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), {
                    "!text-blue-500 rounded-full": currentPath.includes(
                      `${route.href}`
                    ),
                  })}
                >
                  {route.title}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem className="rounded-full">
          <SearchDialogTrigger className="flex items-center justify-center rounded-full" />
        </NavigationMenuItem>

        <NavigationMenuItem className="rounded-full">
          <DirectThemeToggle />
        </NavigationMenuItem>
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
