"use client"

import { usePathname } from "next/navigation"

import {
  UserLayoutRouteProps,
  userLayoutRoutes,
} from "@/config/routes/user-layout-routes"
import { PageTitle } from "@/components/layout/page-title"

import { UserPagesMobileNavSheet } from "./user-pages-mobile-nav-sheet"

type UserPagesTitleProps = { className?: string; children?: React.ReactNode }

export const UserPagesTitle: React.FC<UserPagesTitleProps> = ({
  children,
  className,
}) => {
  const pathname = usePathname()

  if (pathname === "/user") {
    return (
      <div className="flex items-center justify-between">
        <PageTitle title="User" withBorder={false} className={className} />
        <UserPagesMobileNavSheet />
      </div>
    )
  }

  const matchedRoute = userLayoutRoutes.reduce<UserLayoutRouteProps | null>(
    (matched, group) => {
      if (matched) return matched

      const matchedItem = group.items.find((item) => item.href === pathname)

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

  // Extract the title from the matched route
  const title = matchedRoute?.items[0]?.title || null
  const description = matchedRoute?.items[0]?.description || undefined

  if (title !== null || title)
    return (
      <PageTitle
        title={title}
        withBorder={false}
        subtitle={description}
        className={className}
      >
        {children}
      </PageTitle>
    )
}
