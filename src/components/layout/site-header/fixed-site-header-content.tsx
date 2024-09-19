"use client"

import useSideMenu from "@/hooks/use-side-menu"
import AccountModalTrigger from "@/components/auth/auth-modal/account-modal-trigger"
import SearchCommandDialogTrigger from "@/components/search-command-dialog/search-dialog-trigger"

import { BackForwardButtons } from "./back-forward-buttons"
import { PageSettings } from "./page-settings"
import { SideMenuToggler } from "./side-menu-toggler"
import { SiteLogo } from "./site-header"

type FixedSiteHeaderContentProps = {}

export const FixedSiteHeaderContent: React.FC<
  FixedSiteHeaderContentProps
> = ({}) => {
  const isPinned = useSideMenu((state) => state.isPinned)

  return (
    <div className="flex w-full items-center gap-x-4">
      <SideMenuToggler />

      {!isPinned && (
        <SiteLogo
          className="sm:w-fit"
          linkCN="page-title-font inline animate-magic-fade-in text-balance bg-gradient-to-r hover:from-primary hover:to-primary hover:via-primary from-primary/75 via-primary to-primary/75 bg-clip-text !leading-tight text-transparent opacity-0 transition-all duration-500 ease-out [--animation-delay:500ms] dark:from-zinc-300 dark:via-zinc-400 dark:to-zinc-300 text-sm dark:from-10% dark:via-40% dark:to-100% hover:dark:from-zinc-300 hover:dark:via-zinc-300 hover:dark:to-zinc-300 text-lg"
        />
      )}

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-x-2">
          <BackForwardButtons />
          <SearchCommandDialogTrigger
            isCollapsed={false}
            iconClassName="text-muted-foreground"
            triggerCN="hover:border dark:border-none dark:hover:shadow-outline shadow-sm !w-44 !rounded-xl"
          />
        </div>

        <div className="flex items-center gap-x-4">
          <PageSettings />
          <AccountModalTrigger className="size-8" />
        </div>
      </div>
    </div>
  )
}
