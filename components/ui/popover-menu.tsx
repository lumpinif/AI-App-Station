// TODO: REMOVE THIS BEFORE PRODUCTION: https://www.ibelick.com/lab/family-popover-menu
// TODO: IMPLEMENT THIS BEFORE PRODUCTION
"use client"

import React, { useState } from "react"
import { PlusIcon } from "@radix-ui/react-icons"
import { AnimatePresence, motion } from "framer-motion"

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

  const isAppSubmitModalOpen = useAppSubmitModalStore(
    (state) => state.isAppSubmitModalOpen
  )

  const { isPopoverOpen, togglePopover } = usePopoverStore()

  const { isMobile } = useMediaQuery()

  const duration = 0.25
  const transition = { duration, ease: [0.32, 0.72, 0, 1] }

  const menuVariants = {
    open: {
      filter: "blur(0px)",
      opacity: 1,
      width: isMobile ? "100%" : "320px",
      height: 150,
      borderRadius: "16px",
      bottom: -44,
      transition,
      // backgroundColor: "#f0f0f4",
    },
    closed: {
      filter: "blur(1.5px)",
      bottom: 0,
      opacity: 1,
      width: "48px",
      height: 48,
      borderRadius: "50%",
      transition,
    },
  }

  const contentVariants = {
    open: { opacity: 1, scale: 1, transition },
    closed: { opacity: 0, scale: 1, transition },
  }

  const buttonVariants = {
    open: {
      opacity: 0,
      transition: {
        duration: duration / 2,
      },
    },
    closed: {
      opacity: 1,
      transition: {
        duration: duration,
      },
    },
  }

  useClickOutside<HTMLDivElement>(refMenu, togglePopover, isAppSubmitModalOpen)

  return (
    <div
      className={cn(
        "relative z-50 flex h-[55px] items-end justify-start",
        className
      )}
    >
      <AnimatePresence>
        {isPopoverOpen && (
          <motion.div
            className={cn(
              "bg-muted absolute bottom-0 left-4 !z-50 flex flex-col items-center overflow-hidden p-1 ",
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
          "bg-muted dark:bg-muted/50 text-muted-foreground absolute bottom-0 left-4 flex h-12 w-12 items-center justify-center rounded-full p-2 outline-none",
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
      >
        <PlusIcon className="h-6 w-6" />
      </motion.button>
    </div>
  )
}
