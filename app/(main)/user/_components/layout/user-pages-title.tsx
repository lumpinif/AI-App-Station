"use client"

import { usePathname } from "next/navigation"

import {
  UserLayoutRouteProps,
  userLayoutRoutes,
} from "@/config/user-layout-routes"
import { PageTitle } from "@/components/layout/page-title"

type UserPagesTitleProps = { className?: string }

export const UserPagesTitle: React.FC<UserPagesTitleProps> = ({
  className,
}) => {
  const pathname = usePathname()

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
  const title = matchedRoute?.items[0]?.title || "User"
  const description = matchedRoute?.items[0]?.description || undefined

  // return <div className={className}>{title}</div>
  return <PageTitle title={title} isBorder={false} subtitle={description} />
}
