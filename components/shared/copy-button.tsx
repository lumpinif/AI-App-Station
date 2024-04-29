"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Copy } from "lucide-react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { toast } from "sonner"

import { cn, getSiteUrl } from "@/lib/utils"

import { Button } from "../ui/button"
import { LoadingSpinner } from "./loading-spinner"

const buttonCopy = {
  idle: (
    <>
      <span>Copy Link</span>
      <Copy size={16} />
    </>
  ),
  loading: <LoadingSpinner size={16} />,
  success: (
    <>
      <span>Link Copied</span>
      <Check size={16} />
    </>
  ),
} as const

type CopyButtonProps = { className?: string; url?: string; isToast?: boolean }

export const CopyButton: React.FC<CopyButtonProps> = ({
  isToast = true,
  className,
  url: urlProp,
}) => {
  const [buttonState, setButtonState] =
    useState<keyof typeof buttonCopy>("idle")
  const pathname = usePathname()

  const url =
    !urlProp || urlProp === ""
      ? `${getSiteUrl()}${pathname}` || `${window.location.origin}${pathname}`
      : urlProp

  return (
    <CopyToClipboard
      text={url}
      onCopy={() => {
        // TODO: CONSIDER TO ADD USEDEBOUNCED
        if (buttonState === "success") return

        setButtonState("success")

        if (isToast) {
          toast.success("Copied to clipboard", {
            description: url,
            duration: 1500,
          })
        }
        setTimeout(() => {
          setButtonState("idle")
        }, 3500)
      }}
    >
      <Button
        variant={buttonState === "success" ? "success" : "outline"}
        className={cn("relative select-none overflow-hidden", className)}
        disabled={buttonState === "loading"}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            transition={{ type: "spring", duration: 0.48, bounce: 0 }}
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -45 }}
            key={buttonState}
            className="flex w-full items-center justify-center space-x-2 text-nowrap"
          >
            {buttonCopy[buttonState]}
          </motion.span>
        </AnimatePresence>
      </Button>
    </CopyToClipboard>
  )
}
