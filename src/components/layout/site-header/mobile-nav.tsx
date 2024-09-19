"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"

import { MAINROUTES, NavItemProps } from "@/config/routes/site-routes"
import { cn } from "@/lib/utils"
import { useScroll } from "@/hooks/use-scroll"
import SearchCommandDialogTrigger from "@/components/search-command-dialog/search-dialog-trigger"

const MobileNav = () => {
  const { scrolled, hideNavOnScroll } = useScroll(5)

  return (
    <MobileNavBar
      routes={MAINROUTES}
      className={cn(
        scrolled ? "translate-y-[115%] opacity-30" : ``,
        !hideNavOnScroll ? `translate-y-0 opacity-100` : ``
      )}
    />
  )
}

export default MobileNav

interface MobileNavBarProps {
  routes: NavItemProps[]
  className?: string | undefined
}

const MobileNavBar = ({ routes, className, ...props }: MobileNavBarProps) => {
  const currentPath = usePathname()
  return (
    <nav
      className={cn(
        "tab-bar-container fixed bottom-5 left-1/2 -translate-x-1/2 md:hidden",
        className
      )}
      {...props}
    >
      <div className="flex w-full items-start justify-between px-2 text-sm">
        {routes
          .filter((route) => route.inMobileNav && route.id !== "search")
          .map((route) =>
            route.disabled ? (
              <div
                key={route.id}
                className="nav-link cursor-not-allowed opacity-50"
              >
                <div className="flex flex-col items-center justify-center">
                  {route.icon && <route.icon className="size-4" />}
                  {route.title}
                </div>
              </div>
            ) : (
              <Link
                href={`${route.href}`}
                key={route.id}
                className={cn({
                  "nav-link": true,
                  "rounded-full !text-blue-500": currentPath.startsWith(
                    `${route.href}`
                  ),
                })}
              >
                <div className="flex flex-col items-center justify-center">
                  {route.icon && <route.icon className="size-4" />}
                  {route.title}
                </div>
              </Link>
            )
          )}
        <SearchCommandDialogTrigger withTooltip={false}>
          <div
            className={cn("flex flex-col items-center justify-center", {
              "nav-link": true,
              "rounded-full !text-blue-500": currentPath.startsWith(`/search`),
            })}
          >
            <Search className="size-4" />
            Search
          </div>
        </SearchCommandDialogTrigger>
      </div>
    </nav>
  )
}
