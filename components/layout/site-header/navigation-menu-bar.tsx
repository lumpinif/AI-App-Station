"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { MAINROUTES } from "@/config/routes/main-routes"
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
import SearchCommandDialogTrigger from "@/components/search-command-dialog/search-dialog-trigger"

export function NavigationMenuBar() {
  const currentPath = usePathname()
  return (
    <NavigationMenu>
      <NavigationMenuList className="glass-card-background text-foreground dark:shadow-outline mx-2 h-14 rounded-full p-2 backdrop-blur-lg transition-all duration-500 ease-in-out hover:opacity-100">
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
                    <div className="mb-2 mt-4 text-lg font-medium ">
                      AI App Station
                    </div>
                    <p className="dark:text-muted-foreground text-sm leading-tight">
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

        {MAINROUTES.filter((route) => route.inMainNav).map((route) => (
          <NavigationMenuItem
            key={route.id}
            className="cursor-pointer select-none"
          >
            {route.href !== "/search" && (
              <Link href={`${route.href}`} legacyBehavior>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), {
                    "!text-blue-500": currentPath.includes(`${route.href}`),
                  })}
                >
                  {route.title}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem className="rounded-full">
          <SearchCommandDialogTrigger className="flex items-center justify-center rounded-full" />
        </NavigationMenuItem>

        {/* <NavigationMenuItem className="rounded-full">
          <ThemeToggle isDropDown />
        </NavigationMenuItem> */}
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
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
