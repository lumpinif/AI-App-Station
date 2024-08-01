"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"

import { SIDENAVROUTES } from "@/config/routes/main-routes"
import { cn } from "@/lib/utils"
import { useKeyPress } from "@/hooks/use-key-press"
import useSideNav from "@/hooks/use-side-nav-store"
import PopoverMenu from "@/components/ui/popover-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import AccountModalTrigger from "@/components/auth/auth-modal/account-modal-trigger"
import { FloatingSideNavContent } from "@/components/layout/side-menu/floating-side-nav-content"
import SearchCommandDialogTrigger from "@/components/search-command-dialog/search-dialog-trigger"
import { ThemeToggle } from "@/components/theme/theme-toggle"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip"

export const buttonClassBase =
  "flex h-12 w-12 translate-x-1.5 items-center justify-center rounded-full text-muted-foreground outline-none transition-all duration-200 ease-out hover:cursor-pointer hover:bg-foreground/10 hover:text-foreground"

const FloatingSideNav: React.FC = () => {
  const router = useRouter()
  const collectionRoutes = SIDENAVROUTES.find(
    (route) => route.title === "Collections"
  )
  const collectionItems = collectionRoutes?.items
  const isOpen = useSideNav((state) => state.isOpen)

  const handleKeyPress = (event: KeyboardEvent) => {
    if (isOpen) {
      const pressedKey = event.code
      const matchingItem = collectionItems?.find(
        (item) => `Digit${item.shortcutNumber}` === pressedKey
      )

      if (matchingItem) {
        router.push(matchingItem.href)
      }

      /* switch (event.code) {
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
      } */
    }
  }

  useKeyPress({
    callback: handleKeyPress,
    keyCodes: ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6"],
  })

  const sideNavClass = cn(
    "cubic-bezier(0.32, 0.72, 0, 1) inline-flex flex-col gap-2.5 p-2.5 transition-all duration-500",
    !isOpen
      ? "w-20 rounded-[2.5rem] dark:bg-transparent"
      : "dark:glass-card-background w-48 rounded-3xl bg-muted dark:shadow-outline"
  )

  return (
    <aside
      className={cn(
        "cubic-bezier(0.32, 0.72, 0, 1) z-40 hidden max-h-[calc(80svh)] w-fit rounded-3xl backdrop-blur-xl transition-all duration-500 md:flex md:flex-col",
        !isOpen
          ? "rounded-[2.5rem] dark:shadow-outline md:ml-0 2xl:-ml-16 3xl:-ml-40"
          : "-ml-56 mt-16 md:-ml-2 lg:-ml-4 2xl:-ml-20 3xl:-ml-60"
      )}
    >
      <TooltipProvider>
        <ScrollArea className="relative z-50 h-full w-full rounded-3xl">
          <div className={sideNavClass}>
            <SideNavToggle isOpen={isOpen} />
            {isOpen && <SearchTrigger isOpen={isOpen} />}
            <FloatingSideNavContent items={SIDENAVROUTES} isOpen={isOpen} />
            {!isOpen && <SearchTrigger isOpen={isOpen} />}
            <SideNavThemeToggle isOpen={isOpen} />
            <SideMenuAuthTrigger isOpen={isOpen} />
          </div>
        </ScrollArea>
        {!isOpen && <PopoverMenu className={!isOpen ? "!w-20" : "!w-48"} />}
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
            <kbd className="pointer-events-none right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] opacity-100 dark:bg-muted-foreground/60 sm:flex">
              <span className="text-xs">⌘</span>space
            </kbd>
          </TooltipContent>
        )}
        <h1
          className={`pointer-events-none absolute right-4 origin-left select-none text-nowrap text-sm text-foreground opacity-100 duration-300 ${
            !isOpen && "scale-0"
          }`}
        >
          <kbd className="pointer-events-none right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] opacity-100 dark:bg-muted-foreground/60 sm:flex">
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
          <SearchCommandDialogTrigger className={buttonClass} sideOffset={10} />
          <h1
            className={`pointer-events-none absolute right-4 origin-left select-none text-nowrap text-sm text-foreground opacity-100 duration-300 ${
              !isOpen && "scale-0"
            }`}
          >
            <kbd className="pointer-events-none right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] opacity-100 dark:bg-muted-foreground/60 sm:flex">
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
          className={`pointer-events-none absolute right-4 origin-left select-none text-nowrap text-sm text-foreground opacity-100 duration-300 ${
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

export default FloatingSideNav
