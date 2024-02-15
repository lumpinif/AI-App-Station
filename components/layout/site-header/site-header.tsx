import Link from "next/link"

import AuthModalTrigger from "@/components/auth/auth-modal/auth-modal-trigger"

import FloatingNav from "./floating-nav"
import MobileNav from "./mobile-nav"

export async function SiteHeader() {
  return (
    <header className="relative max-w-full">
      <LogoAuthHeader />
      <header className="flex items-center justify-center">
        <MobileNav />
        <FloatingNav />
      </header>
    </header>
  )
}

export const LogoAuthHeader = () => (
  <div className="flex items-center justify-between space-x-4 px-8 py-4 sm:space-x-0 sm:py-6">
    <div className="flex grow-0 items-center space-x-4 sm:w-24 md:flex">
      <Link
        href="/"
        className="md:text text-nowrap font-semibold sm:hidden lg:flex"
      >
        AI App Station
      </Link>
    </div>
    <AuthModalTrigger />
  </div>
)
