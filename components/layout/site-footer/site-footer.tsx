"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export function SiteFooter() {
  return (
    <section className="container">
      <footer className="mt-2 flex h-24 items-center justify-between border-t-[0.5px] ">
        <div className="flex w-full flex-1 flex-nowrap justify-center gap-4 sm:justify-start">
          <span className="text-muted-foreground flex-nowrap gap-1 text-balance text-center text-xs leading-loose sm:text-left">
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
        <div className="hidden sm:flex">
          <ThemeToggle />
        </div>
      </footer>
    </section>
  )
}
