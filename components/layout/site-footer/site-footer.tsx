import Link from "next/link"

import { siteConfig } from "@/config/site"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export function SiteFooter() {
  return (
    <footer className="container mt-2 flex h-24 items-center justify-between border-t-[0.5px]">
      <div className="flex w-full flex-1 flex-nowrap gap-4 sm:justify-start">
        <span className="flex-nowrap gap-1 text-balance text-left text-xs leading-loose text-muted-foreground">
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
