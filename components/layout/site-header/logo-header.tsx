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
      <div className="container flex h-20 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Icons.logo className="h-8 w-8 text-blue-500" />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <LogoHeaderDropdown />
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <DirectThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default LogoHeader
