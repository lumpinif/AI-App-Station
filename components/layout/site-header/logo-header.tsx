import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons/icons"

import { DirectThemeToggle } from "../../theme/direct-theme-toggle"
import { ThemeToggle } from "../../theme/theme-toggle"
import { LogoHeaderDropdown } from "./logo-header-dropdown"

const LogoHeader = () => {
  return (
    <header className="w-full">
      <div className="flex h-24 items-center space-x-4 px-8 sm:justify-between sm:space-x-0">
        <div className="flex items-center space-x-4 md:flex">
          <Link href="/">
            <Icons.logo className="h-8 w-8 " />
          </Link>
          <Link href="/" className=" flex font-semibold md:hidden md:text-lg ">
            OpenmindAI Station
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <LogoHeaderDropdown />
          <DirectThemeToggle />{" "}
        </div>
      </div>
    </header>
  )
}

export default LogoHeader
