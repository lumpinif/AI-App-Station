"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeftFromLine, ArrowRightFromLine, Search } from "lucide-react"

import { SIDENAVROUTES } from "@/config/routes"
import { cn } from "@/lib/utils"
import { useKeyPress } from "@/hooks/use-key-press"
import useSideNav from "@/hooks/use-side-nav-store"
import AuthModalTrigger from "@/components/auth/auth-modal/auth-modal-trigger"
import { FloatingSideNavContent } from "@/components/layout/side-menu/floating-side-nav-content"
import SearchDialogTrigger from "@/components/shared/search-dialog-trigger"

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
  const router = useRouter()

  const handleKeyPress = (event: KeyboardEvent) => {
    if (isOpen) {
      switch (event.code) {
        case "Digit1":
          router.push("/ai-apps/create")
          break
        case "Digit2":
          router.push("/ai-apps/discovery")
          break
        case "Digit3":
          router.push("/ai-apps/develop")
          break
        case "Digit4":
          router.push("/ai-apps/design")
          break
        case "Digit5":
          router.push("/ai-apps/gpts")
          break
        case "Digit6":
          router.push("/ai-apps/work")
          break
        default:
          break
      }
    }
  }

  useKeyPress({
    callback: handleKeyPress,
    keyCodes: ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6"],
  })

  const sideNavClass = cn(
    "dark:glass-card-background relative inline-flex flex-col gap-2.5 p-2.5 backdrop-blur-lg transition-all duration-300 ease-in dark:shadow-outline dark:backdrop-blur-sm",
    isOpen ? "w-48 rounded-3xl" : "w-20 rounded-[2.5rem]"
  )

  return (
    <TooltipProvider>
      <div className="">
        <div className={sideNavClass}>
          <SideNavToggle isOpen={isOpen} />
          {isOpen && <AuthTrigger isOpen={isOpen} />}
          {isOpen && <SearchTrigger isOpen={isOpen} />}
          <FloatingSideNavContent items={SIDENAVROUTES} isOpen={isOpen} />
          {!isOpen && <SearchTrigger isOpen={isOpen} />}
          {!isOpen && <AuthTrigger isOpen={isOpen} />}
        </div>
      </div>
    </TooltipProvider>
  )
}

interface SideNavToggleProps {
  isOpen?: boolean
}

const SideNavToggle: React.FC<SideNavToggleProps> = React.memo(({ isOpen }) => {
  const ToggleSideNav = useSideNav((state) => state.ToggleSideNav)

  const buttonClass = cn(buttonClassBase, isOpen && "text-foreground")

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === " " && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        ToggleSideNav()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            className="flex items-center gap-2 dark:bg-foreground dark:text-background"
          >
            Open
            <kbd className="pointer-events-none right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 dark:bg-muted-foreground/60 sm:flex">
              <span className="text-xs">⌘</span>space
            </kbd>
          </TooltipContent>
        )}
        <h1
          className={`pointer-events-none absolute right-4 origin-left select-none text-nowrap text-sm font-medium text-foreground opacity-100 duration-300 ${
            !isOpen && "scale-0"
          }`}
        >
          <kbd className="pointer-events-none right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 dark:bg-muted-foreground/60 sm:flex">
            <span className="text-xs">⌘</span>space
          </kbd>
        </h1>
      </div>
    </Tooltip>
  )
})

SideNavToggle.displayName = "SideNavToggle"

export const SearchTrigger: React.FC<SideNavToggleProps> = React.memo(
  ({ isOpen }) => {
    const buttonClass = cn(buttonClassBase)

    return (
      <Tooltip delayDuration={0}>
        <div className={cn("relative flex items-center justify-start")}>
          <SearchDialogTrigger className={buttonClass} />
          <h1
            className={`pointer-events-none absolute right-4 origin-left select-none text-nowrap text-sm font-medium text-foreground opacity-100 duration-300 ${
              !isOpen && "scale-0"
            }`}
          >
            <kbd className="pointer-events-none right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 dark:bg-muted-foreground/60 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </h1>
        </div>
      </Tooltip>
    )
  }
)

SearchTrigger.displayName = "SearchTrigger"

export const AuthTrigger: React.FC<SideNavToggleProps> = React.memo(
  ({ isOpen }) => {
    const buttonClass = cn(buttonClassBase)

    return (
      <div className={cn("relative flex items-center justify-start")}>
        <AuthModalTrigger className={buttonClass} />
        <h1
          className={`pointer-events-none absolute right-4 origin-left select-none text-nowrap text-sm font-medium text-foreground opacity-100 duration-300 ${
            !isOpen && "scale-0"
          }`}
        >
          Account
        </h1>
      </div>
    )
  }
)

AuthTrigger.displayName = "SearchTrigger"

export default FloatingSideNav
