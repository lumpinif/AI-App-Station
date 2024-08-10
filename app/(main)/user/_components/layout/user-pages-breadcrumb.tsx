"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  UserLayoutRouteProps,
  userLayoutRoutes,
} from "@/config/routes/user-layout-routes"
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
  const matchedRoute = userLayoutRoutes.reduce<UserLayoutRouteProps | null>(
    (matched, group) => {
      if (matched) return matched

      const matchedItem = group.items.find((item) =>
        pathname.startsWith(item.href)
      )
      if (matchedItem) {
        return {
          group: group.group,
          items: [matchedItem],
        }
      }

      return null
    },
    null
  )

  // Extract the group and item from the matched route
  const { group, items } = matchedRoute || { group: "", items: [] }

  if (items.length > 0)
    return (
      <nav className="flex items-center justify-between gap-x-2">
        <Breadcrumb>
          <BreadcrumbList>
            {items.length > 0 && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/user">User</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={items[0].href}
                      className={
                        pathname === items[0].href ? "text-primary" : ""
                      }
                    >
                      {items[0].title}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
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

  return (
    <nav className="flex w-full justify-end">
      <UserPagesMobileNavSheet />
    </nav>
  )
}
