"use client"

import Link from "next/link"

import useMediaQuery from "@/hooks/use-media-query"
import { Icons } from "@/components/icons/icons"
import { ThemeToggle } from "@/components/theme/theme-toggle"

import FloatingNav from "./floating-nav"
import MobileNav from "./mobile-nav"

interface LogoHeaderWrapperProps {
  children: React.ReactNode
}

const MainNav = ({ children }: LogoHeaderWrapperProps) => {
  const { isMobile } = useMediaQuery()
  return (
    <header className="relative w-screen">
      <div className="flex h-24 items-center space-x-4 px-8 sm:justify-between sm:space-x-0">
        <div className="flex grow-0 items-center space-x-4 sm:w-24 md:flex">
          <Link href="/">
            <Icons.logo className="h-8 w-8 stroke-[1.5px]" />
          </Link>
          <Link
            href="/"
            className="md:text text-nowrap font-semibold sm:hidden lg:flex"
          >
            AI App Station
          </Link>
        </div>
        <div className="flex grow items-center justify-center">
          {isMobile ? <MobileNav /> : <FloatingNav />}
        </div>
        <div className="flex w-24 grow-0 items-center justify-end space-x-0">
          <div className="mr-1 sm:hidden">
            <ThemeToggle />
          </div>
          {children}
        </div>
      </div>
    </header>
  )
}

export default MainNav
