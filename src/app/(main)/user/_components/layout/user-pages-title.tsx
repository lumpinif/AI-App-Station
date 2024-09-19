"use client"

import { usePathname } from "next/navigation"

import { USERPAGESNAVROUTES } from "@/config/routes/site-routes"
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
      <div className="flex items-center justify-between pb-4 md:py-0">
        <PageTitle title="User" withBorder={false} className={className} />
        <UserPagesMobileNavSheet />
      </div>
    )
  }

  const matchedRoute = USERPAGESNAVROUTES.find(
    (route) => route.href === pathname
  )

  if (matchedRoute) {
    return (
      <PageTitle
        title={matchedRoute.title}
        withBorder={false}
        subtitle={matchedRoute.description}
        className={className}
      >
        {children}
      </PageTitle>
    )
  }

  // If no route is matched, you might want to return null or a default title
  return null
}
