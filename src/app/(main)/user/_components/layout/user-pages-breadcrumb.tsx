"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { USERPAGESNAVROUTES } from "@/config/routes/site-routes"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { UserPagesMobileNavSheet } from "./user-pages-mobile-nav-sheet"

export const isEditorRoute = (pathname: string) => {
  // Regular expression pattern to match a UUID after '/stories/' or '/apps/'
  const uuidPattern =
    /\/(stories|apps)\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/
  return uuidPattern.test(pathname)
}

export const UserPagesBreadCrumb = () => {
  const pathname = usePathname()

  // Find the matching route based on the current pathname
  const matchedRoute = USERPAGESNAVROUTES.find((route) =>
    pathname.startsWith(route.href)
  )

  if (matchedRoute) {
    return (
      <nav className="flex items-center justify-between gap-x-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/user">User</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={matchedRoute.href}
                  className={
                    pathname === matchedRoute.href ? "text-primary" : ""
                  }
                >
                  {matchedRoute.title}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {isEditorRoute(pathname) && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Editor</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        <UserPagesMobileNavSheet />
      </nav>
    )
  }

  return (
    <nav className="flex w-full justify-end">
      <UserPagesMobileNavSheet />
    </nav>
  )
}
