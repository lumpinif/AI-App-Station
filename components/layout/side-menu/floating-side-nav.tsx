"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"

import { SIDENAVROUTES } from "@/config/routes"
import { cn } from "@/lib/utils"
import { useKeyPress } from "@/hooks/use-key-press"
import useSideNav from "@/hooks/use-side-nav-store"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import AccountModalTrigger from "@/components/auth/auth-modal/account-modal-trigger"
import { FloatingSideNavContent } from "@/components/layout/side-menu/floating-side-nav-content"
import SearchDialogTrigger from "@/components/shared/search-dialog-trigger"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import AppSubmitButton from "@/app/(main)/ai-apps/_components/app-submit-button"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip"

export const buttonClassBase =
  "flex h-12 w-12 translate-x-1.5 items-center justify-center rounded-full text-muted-foreground outline-none transition-all duration-200 ease-out hover:cursor-pointer hover:bg-foreground/10 hover:text-foreground"

const FloatingSideNav: React.FC = () => {
  const isOpen = useSideNav((state) => state.isOpen)
  const router = useRouter()

  const handleKeyPress = (event: KeyboardEvent) => {
    if (isOpen) {
      switch (event.code) {
        case "Digit1":
          router.push("/ai-apps/collections/create")
          break
        // case "Digit2":
        //   router.push("/ai-apps/collections/discovery")
        //   break
        case "Digit2":
          router.push("/ai-apps/collections/develop")
          break
        case "Digit3":
          router.push("/ai-apps/collections/design")
          break
        case "Digit4":
          router.push("/ai-apps/collections/gpts")
          break
        case "Digit5":
          router.push("/ai-apps/collections/work")
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
    "dark:glass-card-background cubic-bezier(0.32, 0.72, 0, 1) inline-flex flex-col gap-2.5 p-2.5 transition-all duration-500 dark:shadow-outline",
    !isOpen ? "w-20 rounded-[2.5rem]" : "w-48 rounded-3xl"
  )

  return (
    <aside
      className={cn(
        "cubic-bezier(0.32, 0.72, 0, 1) z-50 hidden max-h-[calc(80svh)] w-fit rounded-3xl backdrop-blur-lg transition-all duration-500 sm:flex",
        !isOpen ? "rounded-[2.5rem]" : "-ml-2 mt-16"
      )}
    >
      <TooltipProvider>
        <ScrollArea className="h-full w-full rounded-3xl">
          <div className={sideNavClass}>
            <SideNavToggle isOpen={isOpen} />
            {isOpen && <SearchTrigger isOpen={isOpen} />}
            <FloatingSideNavContent items={SIDENAVROUTES} isOpen={isOpen} />
            {!isOpen && <SearchTrigger isOpen={isOpen} />}
            {/* TODO: Consider remove the theme toggle before production */}
            <SideNavThemeToggle isOpen={isOpen} />
            <SideNavAppSubmit isOpen={isOpen} />
            <SideMenuAuthTrigger isOpen={isOpen} />
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
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }
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

export const SideMenuAuthTrigger: React.FC<SideNavToggleProps> = React.memo(
  ({ isOpen }) => {
    const buttonClass = cn(buttonClassBase)

    return (
      <div className={cn("relative flex items-center justify-start")}>
        <AccountModalTrigger className={buttonClass} />
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

SideMenuAuthTrigger.displayName = "AuthTrigger"

export const SideNavThemeToggle: React.FC<SideNavToggleProps> = React.memo(
  ({ isOpen }) => {
    const buttonClass = cn(buttonClassBase)

    return (
      <div className={cn("relative flex items-center justify-start")}>
        <ThemeToggle isDirect className={buttonClass} />
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

export const SideNavAppSubmit: React.FC<SideNavToggleProps> = React.memo(
  ({ isOpen }) => {
    const buttonClass = cn(buttonClassBase)

    return (
      <div className={cn("relative flex items-center justify-start")}>
        <AppSubmitButton className={buttonClass} />
        <h1
          className={`pointer-events-none absolute right-4 origin-left select-none text-nowrap text-sm text-foreground opacity-100 duration-300 ${
            !isOpen && "scale-0"
          }`}
        >
          Submit Apps
        </h1>
      </div>
    )
  }
)

SideNavAppSubmit.displayName = "SideNavAppSubmit"

export default FloatingSideNav
