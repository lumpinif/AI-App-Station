"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

import { Button, ButtonProps } from "../ui/button"
import { LoadingSpinner } from "./loading-spinner"

type SpinnerButtonProps = ButtonProps & {
  className?: string
  isLoading?: boolean
  withSuccess?: boolean
  motionClassName?: string
  children?: React.ReactNode
  loadingElement?: React.ReactNode
  successElement?: React.ReactNode
  buttonVariant?: ButtonProps["variant"]
  buttonState?: "idle" | "loading" | "success"
  setButtonState?: React.Dispatch<
    React.SetStateAction<"idle" | "loading" | "success">
  >
}

export const SpinnerButton: React.FC<SpinnerButtonProps> = ({
  children,
  isLoading,
  className,
  withSuccess,
  buttonState,
  buttonVariant,
  loadingElement,
  successElement,
  setButtonState,
  motionClassName,
  ...props
}) => {
  const defaultButtonState = isLoading ? "loading" : "idle"

  const buttonCopy = {
    idle: children,
    loading: loadingElement ? loadingElement : <LoadingSpinner size={16} />,
    success: successElement || undefined,
  } as const

  if (withSuccess && buttonState)
    return (
      <Button
        variant={
          buttonState === "success"
            ? "success"
            : buttonVariant
              ? buttonVariant
              : "default"
        }
        className={cn(
          "relative select-none overflow-hidden",
          className,
          !loadingElement
            ? "disabled:bg-current"
            : "disabled:bg-current dark:disabled:bg-inherit"
        )}
        disabled={buttonState === "loading"}
        {...props}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={buttonState}
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -45 }}
            className={cn(
              "flex w-full items-center justify-center space-x-2 text-nowrap",
              motionClassName,
              buttonState === "loading" && loadingElement ? "text-primary" : ""
            )}
            transition={{ type: "spring", duration: 0.48, bounce: 0 }}
          >
            {buttonCopy[buttonState]}
          </motion.span>
        </AnimatePresence>
      </Button>
    )

  return (
    <Button
      variant={buttonVariant}
      className={cn("relative select-none overflow-hidden", className)}
      disabled={isLoading}
      {...props}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={defaultButtonState}
          transition={{ type: "spring", duration: 0.48, bounce: 0 }}
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -45 }}
          className={cn(
            "flex w-full items-center justify-center space-x-2 text-nowrap",
            motionClassName
          )}
        >
          {buttonCopy[defaultButtonState]}
        </motion.span>
      </AnimatePresence>
    </Button>
  )
}
