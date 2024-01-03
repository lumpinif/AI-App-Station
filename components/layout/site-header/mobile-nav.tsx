"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import classNames from "classnames"

import { mainroutes } from "@/config/routes"
import { cn } from "@/lib/utils"
import { useScrollAndHideNav } from "@/hooks/use-scroll"

const MobileNav = () => {
  const { scrolled, hideNavOnScroll } = useScrollAndHideNav(5)

  return (
    <BottomNavigationBar
      routes={mainroutes}
      className={`${scrolled ? "translate-y-[80%] opacity-30" : ``} ${
        !hideNavOnScroll ? `translate-y-0 opacity-100` : ``
      }`}
    />
  )
}

export default MobileNav

interface NavLinksProps {
  routes: {
    href: string
    label: string
    icon: JSX.Element
  }[]
  className?: string | undefined
}

const BottomNavigationBar = ({
  routes,
  className,
  ...props
}: NavLinksProps) => {
  const currentPath = usePathname()
  return (
    <nav className={cn("tab-bar-container", className)} {...props}>
      <div className="flex w-full items-start justify-between px-2 text-sm">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.label}
            className={classNames({
              "nav-link": true,
              "!text-blue-500": currentPath === route.href,
            })}
          >
            <div className="flex flex-col items-center justify-center">
              {route.icon}
              {route.label}
            </div>
          </Link>
        ))}
      </div>
    </nav>
  )
}
