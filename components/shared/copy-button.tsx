"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Copy } from "lucide-react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { toast } from "sonner"

import { App } from "@/types/db_tables"
import { cn, getSiteUrl } from "@/lib/utils"

import { Button } from "../ui/button"
import { LoadingSpinner } from "./loading-spinner"

const buttonCopy = {
  idle: (
    <>
      <span>Copy</span>
      <Copy size={16} />
    </>
  ),
  loading: <LoadingSpinner size={16} />,
  success: (
    <>
      <span>Copied!</span>
      <Check size={16} />
    </>
  ),
} as const

type CopyButtonProps = { className?: string }

export const CopyButton: React.FC<CopyButtonProps> = ({ className }) => {
  const [buttonState, setButtonState] =
    useState<keyof typeof buttonCopy>("idle")
  const pathname = usePathname()
  const url =
    `${getSiteUrl()}${pathname}` || `${window.location.origin}${pathname}`

  return (
    <CopyToClipboard
      text={url}
      onCopy={() => {
        if (buttonState === "success") return

        setTimeout(async () => {
          setButtonState("success")
          toast.success("Copied to clipboard", { description: url })
        }, 0)

        setTimeout(() => {
          setButtonState("idle")
        }, 3500)
      }}
    >
      <Button
        size={"sm"}
        className={cn("max-w-sm", className)}
        disabled={buttonState === "loading"}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            key={buttonState}
            className="flex w-fit items-center space-x-2 text-nowrap"
          >
            {buttonCopy[buttonState]}
          </motion.span>
        </AnimatePresence>
      </Button>
    </CopyToClipboard>
  )
}
