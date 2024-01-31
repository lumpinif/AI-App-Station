"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeftFromLine, ArrowRightFromLine, Search } from "lucide-react"

import { SIDENAVROUTES } from "@/config/routes"
import { cn } from "@/lib/utils"
import { useKeyPress } from "@/hooks/use-key-press"
import useSideNav from "@/hooks/use-side-nav-store"
import { ScrollArea } from "@/components/ui/scroll-area"
import AuthModalTrigger from "@/components/auth/auth-modal/auth-modal-trigger"
import { FloatingSideNavContent } from "@/components/layout/side-menu/floating-side-nav-content"
import SearchDialogTrigger from "@/components/shared/search-dialog-trigger"
import { DirectThemeToggle } from "@/components/theme/direct-theme-toggle"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip"

export const buttonClassBase =
  "flex h-12 w-12 translate-x-1.5 items-center justify-center rounded-full text-muted-foreground outline-none transition-all duration-300 ease-in hover:cursor-pointer hover:bg-foreground/10 hover:text-foreground"

const FloatingSideNav: React.FC = () => {
  const isOpen = useSideNav((state) => state.isOpen)
  const router = useRouter()

  const handleKeyPress = (event: KeyboardEvent) => {
    if (isOpen) {
      switch (event.code) {
        case "Digit1":
          router.push("/today")
          break
        case "Digit2":
          router.push("/ai-apps")
          break
        case "Digit3":
          router.push("/discover")
          break
        case "Digit4":
          router.push("/search")
          break
        // case "Digit5":
        //   router.push("/ai-apps/gpts")
        //   break
        // case "Digit6":
        //   router.push("/ai-apps/work")
        //   break
        default:
          break
      }
    }
  }

  useKeyPress({
    callback: handleKeyPress,
    keyCodes: [
      "Digit1",
      "Digit2",
      "Digit3",
      "Digit4",
      // "Digit5",
      // "Digit6"
    ],
  })

  const sideNavClass = cn(
    "dark:glass-card-background inline-flex flex-col gap-2.5 p-2.5 dark:shadow-outline",
    !isOpen ? "w-20 rounded-[2.5rem]" : "w-48 rounded-3xl"
  )

  return (
    <aside
      className={cn(
        "z-50 hidden max-h-[calc(80vh)] w-fit rounded-3xl backdrop-blur-lg transition-all duration-300 ease-linear sm:flex",
        !isOpen ? "mb-2 ml-4 rounded-[2.5rem] " : "mb-6 ml-6"
      )}
    >
      <TooltipProvider>
        <ScrollArea className="h-full w-full rounded-3xl">
          <div className={sideNavClass}>
            <SideNavToggle isOpen={isOpen} />
            {isOpen && <AuthTrigger isOpen={isOpen} />}
            {isOpen && <SearchTrigger isOpen={isOpen} />}
            <FloatingSideNavContent items={SIDENAVROUTES} isOpen={isOpen} />
            {!isOpen && <SearchTrigger isOpen={isOpen} />}
            <SideNavThemeToggle isOpen={isOpen} />
            {!isOpen && <AuthTrigger isOpen={isOpen} />}
          </div>
        </ScrollArea>
      </TooltipProvider>
    </aside>
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
            <kbd className="pointer-events-none right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px]  opacity-100 dark:bg-muted-foreground/60 sm:flex">
              <span className="text-xs">⌘</span>space
            </kbd>
          </TooltipContent>
        )}
        <h1
          className={`pointer-events-none absolute right-4 origin-left select-none text-nowrap text-sm  text-foreground opacity-100 duration-300 ${
            !isOpen && "scale-0"
          }`}
        >
          <kbd className="pointer-events-none right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px]  opacity-100 dark:bg-muted-foreground/60 sm:flex">
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
            className={`pointer-events-none absolute right-4 origin-left select-none text-nowrap text-sm text-foreground opacity-100 duration-300 ${
              !isOpen && "scale-0"
            }`}
          >
            <kbd className="pointer-events-none right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px]  opacity-100 dark:bg-muted-foreground/60 sm:flex">
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
          className={`pointer-events-none absolute right-4 origin-left select-none text-nowrap text-sm  text-foreground opacity-100 duration-300 ${
            !isOpen && "scale-0"
          }`}
        >
          Account
        </h1>
      </div>
    )
  }
)

AuthTrigger.displayName = "AuthTrigger"

export const SideNavThemeToggle: React.FC<SideNavToggleProps> = React.memo(
  ({ isOpen }) => {
    const buttonClass = cn(buttonClassBase)

    return (
      <div className={cn("relative flex items-center justify-start")}>
        <DirectThemeToggle className={buttonClass} />
        <h1
          className={`pointer-events-none absolute right-4 origin-left select-none text-nowrap text-sm text-foreground opacity-100 duration-300 ${
            !isOpen && "scale-0"
          }`}
        >
          Dark / White
        </h1>
      </div>
    )
  }
)

SideNavThemeToggle.displayName = "SideNavThemeToggle"

export default FloatingSideNav
