"use client"

import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

import { Button, ButtonProps } from "../ui/button"
import { LoadingSpinner } from "./loading-spinner"

type SpinnerButtonProps = ButtonProps & {
  isLoading: boolean
  children?: React.ReactNode
  motionClassName?: string
  className?: string
  buttonVariant?: ButtonProps["variant"]
}

export const SpinnerButton: React.FC<SpinnerButtonProps> = ({
  children,
  isLoading,
  motionClassName,
  className,
  buttonVariant,
  ...props
}) => {
  const buttonState = isLoading ? "loading" : "idle"

  const buttonCopy = {
    idle: children,
    loading: <LoadingSpinner size={16} />,
  } as const

  return (
    <Button
      variant={buttonVariant}
      className={cn("relative select-none overflow-hidden", className)}
      disabled={isLoading}
      {...props}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          transition={{ type: "spring", duration: 0.48, bounce: 0 }}
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -45 }}
          key={buttonState}
          className={cn(
            "flex w-full items-center justify-center space-x-2 text-nowrap",
            motionClassName
          )}
        >
          {buttonCopy[buttonState]}
        </motion.span>
      </AnimatePresence>
    </Button>
  )
}
