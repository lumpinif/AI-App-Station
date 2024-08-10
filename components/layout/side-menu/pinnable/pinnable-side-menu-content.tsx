"use client"

import React, { memo } from "react"

import { SiteLogo } from "../../site-header/site-header"
import { usePinnableSideMenu } from "./use-pinnable-side-menu"
import { PinnableSideMenuNavLinks } from "./pinnable-side-menu-nav-links"

const PinnableSideMenuContent: React.FC = () => {
  const { isPinned } = usePinnableSideMenu()

  return (
    <div className="flex h-full w-full flex-col gap-y-2">
      {isPinned && <PinnedLogo />}
      <PinnableSideMenuNavLinks isPinned={isPinned} />
    </div>
  )
}

const PinnedLogo = memo(() => (
  <div className="flex h-14 items-center justify-center rounded-2xl bg-background dark:border-none">
    <SiteLogo
      className="w-full sm:w-fit"
      linkCN="page-title-font inline animate-magic-fade-in text-balance bg-gradient-to-r hover:from-primary hover:to-primary hover:via-primary from-primary/75 via-primary to-primary/75 bg-clip-text !leading-tight text-transparent opacity-0 transition-all duration-500 ease-out [--animation-delay:500ms] dark:from-zinc-300 dark:via-zinc-400 dark:to-zinc-300 text-sm dark:from-10% dark:via-40% dark:to-100% hover:dark:from-zinc-300 hover:dark:via-zinc-300 hover:dark:to-zinc-300 text-md"
    />
  </div>
))

PinnedLogo.displayName = "PinnedLogo"

export default memo(PinnableSideMenuContent)
