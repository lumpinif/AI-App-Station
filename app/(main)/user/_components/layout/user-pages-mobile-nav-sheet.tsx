"use client"

import React from "react"
import Link from "next/link"
import { PanelLeft } from "lucide-react"

import { userLayoutRoutes } from "@/config/user-layout-routes"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SiteLogo } from "@/components/layout/site-header/site-header"

export const UserPagesMobileNavSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="size-8 md:hidden">
          <PanelLeft className="text-muted-foreground size-4" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-5/6 border-none sm:hidden sm:max-w-sm"
      >
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex shrink-0  items-center gap-4 rounded-full px-2.5 text-lg font-semibold md:text-base"
          >
            <SiteLogo />
            <span className="sr-only">AI App Station Logo</span>
          </Link>
          {userLayoutRoutes.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {groupIndex > 0 && <Separator />}
              {group.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5 font-normal"
                >
                  <item.icon className="h-5 w-5 transition-all" />
                  <span>{item.title}</span>
                  <span className="sr-only">{item.title}</span>
                </Link>
              ))}
            </React.Fragment>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
