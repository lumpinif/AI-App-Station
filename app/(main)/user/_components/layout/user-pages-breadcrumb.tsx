"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  UserLayoutRouteProps,
  userLayoutRoutes,
} from "@/config/user-layout-routes"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type UserBreadCrumbProps = {}

export const UserPagesBreadCrumb: React.FC<UserBreadCrumbProps> = () => {
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
                  <Link href={items[0].href}>{items[0].title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    )
}
