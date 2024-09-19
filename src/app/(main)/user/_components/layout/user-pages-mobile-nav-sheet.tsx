"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PanelLeft } from "lucide-react"

import { USERPAGESNAVROUTES } from "@/config/routes/site-routes"
import { cn } from "@/lib/utils"
import useUserProfile from "@/hooks/react-hooks/use-user"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SiteLogo } from "@/components/layout/site-header/site-header"
import SearchCommandDialogTrigger from "@/components/search-command-dialog/search-dialog-trigger"

export const UserPagesMobileNavSheet = () => {
  const { data: profile } = useUserProfile()
  const userRole = profile?.profile_role?.role
  const currentPath = usePathname()

  const filteredRoutes = USERPAGESNAVROUTES.filter((link) => {
    if (link.roleAllowed) {
      return link.roleAllowed.includes(
        userRole as "admin" | "super_admin" | "super_user"
      )
    }
    return true
  })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="size-8 shrink-0 md:hidden"
        >
          <PanelLeft className="size-4 text-muted-foreground" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-5/6 border-none sm:max-w-sm md:hidden md:max-w-md"
      >
        <nav className="grid gap-6 text-base font-medium">
          <Link
            href="#"
            className="group flex shrink-0 items-center gap-4 rounded-full px-2.5 text-lg font-semibold md:text-base"
          >
            <SiteLogo />
            <span className="sr-only">AI App Station Logo</span>
          </Link>

          <Separator />

          {filteredRoutes.map((item, index) => (
            <React.Fragment key={index}>
              {item.title.toLowerCase() === "search" ? (
                <SearchCommandDialogTrigger
                  triggerCN="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5 font-normal"
                  withTooltip={false}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  <span className="font-normal">{item.title}</span>
                  <span className="sr-only">{item.title}</span>
                </SearchCommandDialogTrigger>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 px-2.5 font-normal text-muted-foreground hover:text-foreground",
                    "transition-all duration-200 ease-out",
                    currentPath.startsWith(item.href)
                      ? "font-medium text-blue-500"
                      : "text-muted-foreground"
                  )}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  <span className="font-normal">{item.title}</span>
                  <span className="sr-only">{item.title}</span>
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
