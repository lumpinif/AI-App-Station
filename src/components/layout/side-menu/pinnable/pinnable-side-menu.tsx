"use client"

import { useMemo } from "react"

import { iosTransition } from "@/config/animations/ios-transition"
import { cn } from "@/lib/utils"

import { usePinnableSideMenu } from "./use-pinnable-side-menu"

type PinnableSideMenuProps = {
  children: React.ReactNode
}

export const PinnableSideMenu: React.FC<PinnableSideMenuProps> = ({
  children,
}) => {
  const {
    isOpen,
    isPinned,
    isFullyCollapsed,
    handleMouseEnter,
    handleMouseLeave,
  } = usePinnableSideMenu()

  const menuWidth = useMemo(
    () => (isPinned || isOpen ? "w-64" : isFullyCollapsed ? "w-0" : "w-20"),
    [isPinned, isOpen, isFullyCollapsed]
  )

  const menuHeight = useMemo(
    () => (isPinned ? "h-full" : "h-fit min-h-fit max-h-[calc(65svh)]"),
    [isPinned]
  )

  const mainDivClassName = useMemo(
    () =>
      cn(
        "hidden md:block",
        isPinned
          ? "relative h-full shrink-0"
          : "fixed left-6 top-1/2 z-50 -translate-y-1/2 lg:left-8",
        iosTransition
      ),
    [isPinned]
  )

  const innerDivClassName = useMemo(
    () =>
      cn(
        "overflow-hidden",
        isOpen ? "translate-x-0" : "md:-translate-x-40 lg:translate-x-0",
        isPinned
          ? "rounded-none"
          : "rounded-[2.5rem] border bg-background backdrop-blur-xl hover:shadow-xl dark:border-none dark:shadow-outline overflow-y-auto",
        !isPinned && isOpen && "bg-muted/80",
        menuHeight,
        menuWidth,
        iosTransition,
        isFullyCollapsed && !isPinned && "border-none bg-muted"
      ),
    [isOpen, isPinned, menuHeight, menuWidth, isFullyCollapsed]
  )

  const transparentDivClassName = useMemo(
    () =>
      cn(
        "relative h-full shrink-0 cursor-pointer bg-transparent",
        isFullyCollapsed && "w-44"
      ),
    [isFullyCollapsed]
  )

  return (
    <div
      className={mainDivClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={innerDivClassName}>
        <div className="relative h-full">{children}</div>
      </div>
      {!isPinned && (
        <div
          className={transparentDivClassName}
          onMouseEnter={handleMouseEnter}
        />
      )}
    </div>
  )
}
