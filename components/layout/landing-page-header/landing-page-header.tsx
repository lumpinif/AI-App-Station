import Link from "next/link"

import AuthModalTrigger from "@/components/auth/auth-modal/auth-modal-trigger"
import { Icons } from "@/components/icons/icons"

import { SideMenuAuthTrigger } from "../side-menu/floating-side-nav"
import FloatingNav from "./floating-nav"
import MobileNav from "./mobile-nav"

const Logo = () => (
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
)

const LandingPageFloatingNav = () => {
  return (
    <header className="relative w-screen">
      <div className="z-50 flex items-center justify-between space-x-4 px-8 py-4 sm:space-x-0 sm:py-12">
        <Logo />
        <AuthModalTrigger />
      </div>
      <header className="flex items-center justify-center">
        <MobileNav />
        <FloatingNav />
      </header>
    </header>
  )
}

export async function LandingPageHeader() {
  return <LandingPageFloatingNav />
}
