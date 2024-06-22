// TODO: REMOVE THIS BEFORE PRODUCTION: https://www.ibelick.com/lab/family-popover-menu
// TODO: IMPLEMENT THIS BEFORE PRODUCTION
"use client"

import React, { useState } from "react"
import { PlusIcon } from "@radix-ui/react-icons"
import { AnimatePresence, delay, motion } from "framer-motion"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { useAppSubmitModalStore } from "@/hooks/use-app-submit-modal-store"
import useClickOutside from "@/hooks/use-click-out-side"
import useMediaQuery from "@/hooks/use-media-query"
import { usePopoverStore } from "@/hooks/use-popover-store"

import { PopoverMenuList } from "../popover-menu/popover-menu-list"

type PopoverMenuProps = {
  className?: string
  buttonClassName?: string
  openedClassName?: string
}

export default function PopoverMenu({
  className,
  buttonClassName,
  openedClassName,
}: PopoverMenuProps) {
  const refMenu = React.useRef<HTMLDivElement>(null)
  const { theme, systemTheme } = useTheme()
  const isAppSubmitModalOpen = useAppSubmitModalStore(
    (state) => state.isAppSubmitModalOpen
  )

  const { isPopoverOpen, togglePopover } = usePopoverStore()

  const { isMobile } = useMediaQuery()

  const duration = 0.3
  const transition = { duration, ease: [0.32, 0.72, 0, 1] }

  const backgroundColor =
    theme === "dark" || (theme === "system" && systemTheme === "dark")
      ? "rgb(10 10 10)"
      : "rgb(255 255 255)"

  const menuVariants = {
    open: {
      filter: "blur(0px)",
      backgroundColor: backgroundColor,
      opacity: 1,
      width: isMobile ? "100%" : "300px",
      height: 160,
      borderRadius: "16px",
      bottom: -15,
      transition,
    },
    closed: {
      filter: "blur(3px)",
      backgroundColor: "hsl(var(--background))",
      bottom: 0,
      opacity: 1,
      width: "48px",
      height: 48,
      borderRadius: "50%",
      transition,
    },
  }

  const contentVariants = {
    open: {
      filter: "blur(0px)",
      backgroundColor: backgroundColor,
      opacity: 1,
      scale: 1,
      transition: {
        duration: duration,
      },
    },
    closed: {
      filter: "blur(4px)",
      backgroundColor: "hsl(var(--background))",
      opacity: 0,
      scale: 1,
      transition: {
        duration: duration / 3,
      },
    },
  }

  const buttonVariants = {
    open: {
      opacity: 0,
      backgroundColor: "hsl(var(--transparent))",
      transition: {
        duration: duration / 2,
      },
    },
    closed: {
      opacity: 1,
      backgroundColor: "hsl(var(--transparent))",
      transition: {
        duration: 2 * duration,
      },
    },
  }

  useClickOutside<HTMLDivElement>(refMenu, togglePopover, isAppSubmitModalOpen)

  return (
    <div
      className={cn("z-50 flex h-[55px] items-end justify-start", className)}
    >
      <AnimatePresence>
        {isPopoverOpen && (
          <motion.div
            className={cn(
              "absolute -left-2 bottom-0 flex w-fit flex-col items-center overflow-hidden p-1",
              openedClassName
            )}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            onClick={(e) => e.stopPropagation()}
            ref={refMenu}
          >
            <motion.ul
              variants={contentVariants}
              className="relative flex h-full w-full flex-col space-y-1"
            >
              <PopoverMenuList />
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        className={cn(
          "absolute bottom-0 left-4 flex h-12 w-12 items-center justify-center rounded-full p-2 text-muted-foreground outline-none hover:!bg-foreground/10 hover:text-foreground",
          buttonClassName
        )}
        disabled={isPopoverOpen}
        onClick={(e) => {
          e.stopPropagation()
          togglePopover()
        }}
        variants={buttonVariants}
        initial="closed"
        animate={isPopoverOpen ? "open" : "closed"}
        whileTap={{ scale: 0.95 }}
        layout
      >
        <PlusIcon className="h-6 w-6" />
      </motion.button>
    </div>
  )
}
