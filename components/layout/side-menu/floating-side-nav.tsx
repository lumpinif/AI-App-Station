"use client"

import React, { useCallback } from "react"
import { ArrowLeftFromLine, ArrowRightFromLine, Search } from "lucide-react"

import { SIDENAVROUTES } from "@/config/routes"
import { cn } from "@/lib/utils"
import useSearchDialog from "@/hooks/use-search-dialog-store"
import useSideNav from "@/hooks/use-side-nav-store"
import { FloatingSideNavContent } from "@/components/layout/side-menu/floating-side-nav-content"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip"

const buttonClassBase =
  "flex h-12 w-12 translate-x-1.5 items-center justify-center rounded-full text-muted-foreground outline-none transition-all duration-300 ease-in hover:cursor-pointer hover:bg-foreground/10 hover:text-foreground"

const FloatingSideNav: React.FC = () => {
  const isOpen = useSideNav((state) => state.isOpen)

  const sideNavClass = cn(
    "dark:glass-card-background relative inline-flex flex-col gap-2.5 p-2.5 backdrop-blur-lg transition-all duration-300 ease-in dark:shadow-outline dark:backdrop-blur-sm",
    isOpen ? "w-48 rounded-3xl" : "w-20 rounded-[2.5rem]"
  )

  return (
    <TooltipProvider>
      <div className="">
        <div className={sideNavClass}>
          <SideNavToggle isOpen={isOpen} />
          <SearchTrigger isOpen={isOpen} />
          <FloatingSideNavContent items={SIDENAVROUTES} isOpen={isOpen} />
        </div>
      </div>
    </TooltipProvider>
  )
}

interface SideNavToggleProps {
  isOpen: boolean
}

const SideNavToggle: React.FC<SideNavToggleProps> = React.memo(({ isOpen }) => {
  const ToggleSideNav = useSideNav((state) => state.ToggleSideNav)

  const buttonClass = cn(buttonClassBase, isOpen && "text-foreground")

  return (
    <Tooltip delayDuration={0}>
      <div className={cn("relative flex items-center justify-start")}>
        <TooltipTrigger asChild>
          <button onClick={ToggleSideNav} className={buttonClass}>
            {!isOpen ? <ArrowRightFromLine /> : <ArrowLeftFromLine />}
          </button>
        </TooltipTrigger>
        {!isOpen && (
          <TooltipContent
            side="right"
            className="flex items-center gap-4 dark:bg-foreground dark:text-background"
          >
            Open
          </TooltipContent>
        )}
        <h1
          className={`pointer-events-none absolute right-4 origin-left select-none text-nowrap text-sm font-medium text-foreground opacity-100 duration-300 ${
            !isOpen && "hidden scale-0"
          }`}
        >
          AI Apps
        </h1>
      </div>
    </Tooltip>
  )
})

SideNavToggle.displayName = "SideNavToggle"

const SearchTrigger: React.FC<SideNavToggleProps> = React.memo(({ isOpen }) => {
  const OpenSideNav = useSideNav((state) => state.OpenSideNav)
  const OpenSearchDialog = useSearchDialog((state) => state.OpenSearchDialog)

  const handleClick = useCallback(() => {
    if (!isOpen) {
      OpenSideNav()
    }
    OpenSearchDialog()
  }, [isOpen, OpenSideNav, OpenSearchDialog])

  const buttonClass = cn(buttonClassBase)

  return (
    <Tooltip delayDuration={0}>
      <div className={cn("relative flex items-center justify-start")}>
        <TooltipTrigger asChild>
          <button onClick={handleClick} className={buttonClass}>
            <Search />
          </button>
        </TooltipTrigger>
        {!isOpen && (
          <TooltipContent
            side="right"
            className="flex items-center gap-4 dark:bg-foreground dark:text-background"
          >
            Search
          </TooltipContent>
        )}
        <h1
          className={`pointer-events-none absolute right-4 origin-left select-none text-nowrap text-sm font-medium text-foreground opacity-100 duration-300 ${
            !isOpen && "hidden scale-0"
          }`}
        >
          <kbd className="pointer-events-none right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 dark:bg-muted-foreground/60 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </h1>
      </div>
    </Tooltip>
  )
})

SearchTrigger.displayName = "SearchTrigger"

export default FloatingSideNav
