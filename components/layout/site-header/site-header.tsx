import Image from "next/image"
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
        {/* <FloatingNav /> */}
      </header>
    </header>
  )
}

export const LogoAuthHeader = () => (
  <header className="flex items-center justify-between p-4 md:hidden">
    <SiteLogo className="md:hidden" />
    <AccountModalTrigger className="md:hidden" />
  </header>
)

export const SiteLogo = ({
  className,
  linkCN,
}: {
  linkCN?: string
  className?: string
}) => (
  <div
    className={cn(
      "flex shrink-0 grow-0 items-center space-x-4 sm:w-24 md:flex",
      className
    )}
  >
    <Link href="/" className={cn("text-nowrap font-medium lg:flex", linkCN)}>
      AI App Station (Beta)
    </Link>
  </div>
)

export const SiteIcon = ({ className }: { className?: string }) => (
  <>
    <Image
      src="/logos/AI-logo@512x512.png"
      alt="AI App Station"
      width={32}
      height={32}
      className="rounded-lg drop-shadow-md dark:hidden"
    />
    <Image
      src="/logos/AI-logo-dark@512x512.png"
      alt="AI App Station"
      width={32}
      height={32}
      className="hidden rounded-lg drop-shadow-md dark:flex"
    />
  </>
)
