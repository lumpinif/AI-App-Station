import Link from "next/link"

import { cn } from "@/lib/utils"
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
  <header className="container flex items-center justify-between space-x-4 py-4 sm:space-x-0 sm:py-6">
    <SiteLogo />
    <AccountModalTrigger />
  </header>
)

export const SiteLogo = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex shrink-0 grow-0 items-center space-x-4 sm:w-24 md:flex",
      className
    )}
  >
    <Link href="/" className="text-nowrap font-medium lg:flex">
      AI App Station
    </Link>
  </div>
)
