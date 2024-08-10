// https://www.ibelick.com/lab/family-popover-menu

"use client"

import React, { useMemo } from "react"
import { PlusIcon } from "@radix-ui/react-icons"
import { AnimatePresence, motion } from "framer-motion"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { useAppSubmitModalStore } from "@/hooks/use-app-submit-modal-store"
import useClickOutside from "@/hooks/use-click-out-side"
import useMediaQuery from "@/hooks/use-media-query"
import { usePopoverStore } from "@/hooks/use-popover-store"

import {
  iconCN,
  linkItemCN,
  linkItemTextCN,
} from "../layout/side-menu/pinnable/pinnable-side-menu-nav-links"
import { PopoverMenuList } from "../popover-menu/popover-menu-list"

type PopoverMenuProps = {
  isOpen?: boolean
  className?: string
  buttonClassName?: string
  openedClassName?: string
}

const ANIMATION_DURATION = 0.3
const TRANSITION = { duration: ANIMATION_DURATION, ease: [0.32, 0.72, 0, 1] }

export default function PopoverMenu({
  isOpen,
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

  const backgroundColor = useMemo(() => {
    return theme === "dark" || (theme === "system" && systemTheme === "dark")
      ? "rgb(10 10 10)"
      : "rgb(255 255 255)"
  }, [theme, systemTheme])

  const menuVariants = {
    open: {
      filter: "blur(0px)",
      backgroundColor: backgroundColor,
      opacity: 1,
      width: isMobile ? "100%" : "100%",
      // height: "auto",
      height: 180,
      borderRadius: "16px",
      // bottom: -15,
      padding: "0.25rem",
      transition: TRANSITION,
    },
    closed: {
      filter: "blur(3px)",
      backgroundColor: "hsl(var(--transparent))",
      bottom: 0,
      opacity: 1,
      width: "48px",
      height: 0,
      padding: 0,
      borderRadius: "50%",
      transition: TRANSITION,
    },
  }

  const contentVariants = {
    open: {
      filter: "blur(0px)",
      backgroundColor: backgroundColor,
      opacity: 1,
      scale: 1,
      transition: {
        duration: ANIMATION_DURATION,
      },
    },
    closed: {
      filter: "blur(4px)",
      backgroundColor: "hsl(var(--transparent))",
      opacity: 0,
      scale: 1,
      transition: {
        duration: ANIMATION_DURATION / 3,
      },
    },
  }

  const buttonVariants = {
    open: {
      opacity: 0,
      rotate: 0,
      backgroundColor: "hsl(var(--transparent))",
      transition: {
        duration: ANIMATION_DURATION / 2,
      },
    },
    closed: {
      opacity: 1,
      backgroundColor: "hsl(var(--transparent))",
      transition: {
        duration: 2 * ANIMATION_DURATION,
      },
    },
  }

  useClickOutside<HTMLDivElement>(refMenu, togglePopover, isAppSubmitModalOpen)

  return (
    <div className={cn("relative z-50", className)}>
      <AnimatePresence>
        {isPopoverOpen && isOpen && (
          <motion.div
            className={cn(
              "flex w-full flex-col items-center overflow-hidden",
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
        className={cn(linkItemCN, !isOpen && "justify-center", buttonClassName)}
        onClick={(e) => {
          e.stopPropagation()
          togglePopover()
        }}
        variants={buttonVariants}
        initial="closed"
        animate={isPopoverOpen ? "open" : "closed"}
        whileTap={{ scale: 0.95 }}
      >
        <PlusIcon className={cn("h-6 w-6", iconCN)} />
        <span className={cn(linkItemTextCN, !isOpen ? "scale-0" : "scale-100")}>
          Create
        </span>
      </motion.button>
    </div>
  )
}

/*
old code
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
          "absolute bottom-2 left-4 flex h-12 w-12 items-center justify-center rounded-full p-2 text-muted-foreground outline-none hover:!bg-foreground/10 hover:text-foreground",
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
*/
