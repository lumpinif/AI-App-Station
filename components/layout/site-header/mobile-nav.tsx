"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { MAINROUTES, NavItemProps } from "@/config/routes/main-routes"
import { cn } from "@/lib/utils"
import { useScroll } from "@/hooks/use-scroll"

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
          .filter((route) => route.inMainNav)
          .map((route) => (
            <Link
              href={`${route.href}`}
              key={route.id}
              className={cn({
                "nav-link": true,
                "!text-blue-500 rounded-full": currentPath.includes(
                  `${route.href}`
                ),
              })}
            >
              <div className="flex flex-col items-center justify-center">
                {route.icon && <route.icon className="size-4" />}
                {route.title}
              </div>
            </Link>
          ))}
      </div>
    </nav>
  )
}
