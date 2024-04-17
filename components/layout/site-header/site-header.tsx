import Link from "next/link"

import AccountModalTrigger from "@/components/auth/auth-modal/account-modal-trigger"

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
  <div className="container flex items-center justify-between space-x-4 py-4 sm:space-x-0 sm:py-6">
    <div className="flex grow-0 items-center space-x-4 sm:w-24 md:flex">
      <Link href="/" className="text-nowrap font-semibold lg:flex">
        AI App Station
      </Link>
    </div>
    <div>
      <AccountModalTrigger />
    </div>
  </div>
)
