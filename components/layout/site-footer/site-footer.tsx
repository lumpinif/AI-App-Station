import Link from "next/link"

import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:px-8 md:py-0">
      <div className="flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-balance text-center text-xs leading-loose text-muted-foreground md:text-left">
          © 2024 OpenmindAI.io All rights reserved. Built by{" "}
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="font-medium"
          >
            Felix Lu.
          </Link>{" "}
        </p>
      </div>
    </footer>
  )
}
