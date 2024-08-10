"use client"

import React, { PropsWithChildren, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ChevronsLeft, ChevronsRight, Home, Newspaper } from "lucide-react"

import { AIAPPSPAGENAVROUTES } from "@/config/routes/site-routes"
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
  const currentPath = usePathname()

  const isUserPage = currentPath.startsWith("/user")

  const collectionRoutes = AIAPPSPAGENAVROUTES.find(
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
    }
  }

  useKeyPress({
    callback: handleKeyPress,
    keyCodes: ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6"],
  })

  const sideNavClass = cn(
    "cubic-bezier(0.32, 0.72, 0, 1) inline-flex flex-col gap-2.5 p-2.5 transition-all duration-500",
    !isOpen ? "w-20 dark:bg-transparent" : "w-48"
  )

  return (
    <>
      <TooltipProvider>
        <div
          className={cn(
            "relative hidden flex-none rounded-2xl bg-muted/20 md:flex",
            !isOpen ? "md:w-[15%] lg:w-[12%]" : "md:w-1/4 lg:w-1/5"
          )}
        >
          <nav
            className={cn(
              "group fixed bottom-1/2 top-1/2 z-40 hidden w-fit -translate-y-1/2 flex-col justify-center gap-y-2 md:ml-[2%] md:flex",
              !isOpen ? "" : ""
            )}
          >
            {!isOpen && (
              <SideBarWrapper
                isOpen={isOpen}
                className={cn("opacity-0 !shadow-none group-hover:opacity-100")}
              >
                <div className={cn(sideNavClass)}>
                  <SideNavToggle isOpen={isOpen} />
                </div>
              </SideBarWrapper>
            )}

            <SideBarWrapper isOpen={isOpen}>
              <div className={cn(sideNavClass)}>
                {isOpen && <SideNavToggle isOpen={isOpen} />}
                <SideNavHome isOpen={isOpen} />
                <SearchTrigger isOpen={isOpen} />
                <SideNavStories isOpen={isOpen} />
                <SideMenuAuthTrigger isOpen={isOpen} />
              </div>
            </SideBarWrapper>

            {!isUserPage && (
              <SideBarWrapper isOpen={isOpen} className="max-h-[calc(72svh)]">
                <ScrollArea className="relative z-50 h-full w-full rounded-3xl">
                  <div className={sideNavClass}>
                    <FloatingSideNavContent
                      items={AIAPPSPAGENAVROUTES}
                      isOpen={isOpen}
                    />
                  </div>
                </ScrollArea>
                {!isOpen && (
                  <PopoverMenu className={!isOpen ? "!w-20" : "!w-48"} />
                )}
              </SideBarWrapper>
            )}
          </nav>
        </div>
      </TooltipProvider>
    </>
  )
}

interface SideNavToggleProps {
  isOpen?: boolean
}

export const SideNavHome: React.FC<SideNavToggleProps> = React.memo(
  ({ isOpen }) => {
    const router = useRouter()
    const pathname = usePathname()

    const buttonClass = cn(
      buttonClassBase,
      pathname === "/ai-apps" && "text-primary bg-foreground/10"
    )

    return (
      <Tooltip delayDuration={0}>
        <div className={cn("relative flex items-center justify-start")}>
          <TooltipTrigger asChild>
            <button
              className={buttonClass}
              onClick={() => router.push("/ai-apps")}
            >
              <Home className="stroke-[1.5]" />
            </button>
          </TooltipTrigger>
          {!isOpen && (
            <TooltipContent
              side="right"
              className="flex items-center gap-2 dark:bg-foreground dark:text-background"
            >
              Home
            </TooltipContent>
          )}
          <h1
            className={`pointer-events-none absolute right-4 origin-left select-none text-nowrap text-sm text-foreground opacity-100 duration-300 ${
              !isOpen && "scale-0"
            }`}
          >
            Home
          </h1>
        </div>
      </Tooltip>
    )
  }
)

SideNavHome.displayName = "SideNavHome"

export const SideNavStories: React.FC<SideNavToggleProps> = React.memo(
  ({ isOpen }) => {
    const router = useRouter()
    const pathname = usePathname()

    const buttonClass = cn(
      buttonClassBase,
      pathname === "/stories" && "text-primary bg-foreground/10"
    )

    return (
      <Tooltip delayDuration={0}>
        <div className={cn("relative flex items-center justify-start")}>
          <TooltipTrigger asChild>
            <button
              className={buttonClass}
              onClick={() => router.push("/stories")}
            >
              <Newspaper className="stroke-[1.5]" />
            </button>
          </TooltipTrigger>
          {!isOpen && (
            <TooltipContent
              side="right"
              className="flex items-center gap-2 dark:bg-foreground dark:text-background"
            >
              Stories
            </TooltipContent>
          )}
          <h1
            className={`pointer-events-none absolute right-4 origin-left select-none text-nowrap text-sm text-foreground opacity-100 duration-300 ${
              !isOpen && "scale-0"
            }`}
          >
            Stories
          </h1>
        </div>
      </Tooltip>
    )
  }
)

SideNavStories.displayName = "SideNavStories"

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
            {!isOpen ? <ChevronsRight /> : <ChevronsLeft />}
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
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <div className={cn("relative flex items-center justify-start")}>
            <SearchCommandDialogTrigger
              className={buttonClass}
              sideOffset={10}
            />
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
      </TooltipProvider>
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

type SideBarWrapperProps = PropsWithChildren<SideNavToggleProps> & {
  className?: string
}

export const SideBarWrapper: React.FC<SideBarWrapperProps> = ({
  isOpen,
  children,
  className,
}) => {
  return (
    <aside
      className={cn(
        "cubic-bezier(0.32, 0.72, 0, 1) dark:glass-card-background z-40 hidden w-fit rounded-2xl backdrop-blur-xl transition-all duration-500 dark:shadow-outline md:flex md:flex-col",
        !isOpen && "rounded-[2.5rem]",
        /* !isOpen
          ? "3xl:-ml-36 4xl:-ml-44"
          : "md:-ml-4 2xl:-ml-24 3xl:ml-[-200px] 4xl:-ml-60", */
        className
      )}
    >
      {children}
    </aside>
  )
}

export default FloatingSideNav
