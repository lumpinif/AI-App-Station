import Link from "next/link"

import AuthModalTrigger from "@/components/auth/auth-modal/auth-modal-trigger"
import { Icons } from "@/components/icons/icons"

export const LogoAuthHeader = () => (
  <div className="flex items-center justify-between space-x-4 px-8 py-4 sm:space-x-0 sm:py-6">
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
    <AuthModalTrigger />
  </div>
)
