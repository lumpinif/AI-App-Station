import Link from "next/link"

import { siteConfig } from "@/config/site"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export function SiteFooter() {
  return (
    <footer className="container flex h-24 items-center justify-between">
      <div className="flex w-full flex-1 items-center justify-start gap-4  sm:justify-start">
        <span className="flex items-center justify-center gap-1 text-balance text-center text-xs leading-loose text-muted-foreground md:text-left">
          © 2024 OpenmindAI.io All rights reserved. Built by{" "}
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="font-medium"
          >
            Felix Lu.
          </Link>{" "}
        </span>
      </div>
      <ThemeToggle />
    </footer>
  )
}
