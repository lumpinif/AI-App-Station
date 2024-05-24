"use client"

import React from "react"
import Link from "next/link"
import { PanelLeft } from "lucide-react"

import { userLayoutRoutes } from "@/config/routes/user-layout-routes"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SiteLogo } from "@/components/layout/site-header/site-header"
import SearchCommandDialogTrigger from "@/components/search-command-dialog/search-dialog-trigger"

export const UserPagesMobileNavSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="size-8 shrink-0 md:hidden"
        >
          <PanelLeft className="text-muted-foreground size-4" />
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
            className="group flex shrink-0  items-center gap-4 rounded-full px-2.5 text-lg font-semibold md:text-base"
          >
            <SiteLogo />
            <span className="sr-only">AI App Station Logo</span>
          </Link>
          {userLayoutRoutes.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {groupIndex > 0 && <Separator className="h-[0.5px]" />}

              {group.items.map((item, itemIndex) => (
                <React.Fragment key={itemIndex}>
                  {item.title === "Search" ? (
                    // if the item title is Search
                    <SearchCommandDialogTrigger
                      triggerClassName="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5 font-normal"
                      withTooltip={false}
                    >
                      <item.icon className="h-5 w-5 transition-all" />
                      <span className="font-normal">{item.title}</span>
                      <span className="sr-only">{item.title}</span>
                    </SearchCommandDialogTrigger>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5 font-normal"
                    >
                      <item.icon className="h-5 w-5 transition-all" />
                      <span className="font-normal">{item.title}</span>
                      <span className="sr-only">{item.title}</span>
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
