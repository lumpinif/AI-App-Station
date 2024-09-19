"use client"

import { PropsWithChildren, useCallback, useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

type BackForwardButtonsProps = {}

export const BackForwardButtons: React.FC<BackForwardButtonsProps> = ({}) => {
  const router = useRouter()
  const pathname = usePathname()
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const [historyStack, setHistoryStack] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)

  const updateNavigationState = useCallback(() => {
    setCanGoBack(currentIndex > 0)
    setCanGoForward(currentIndex < historyStack.length - 1)
  }, [currentIndex, historyStack.length])

  useEffect(() => {
    setHistoryStack((prev) => [...prev, pathname])
    setCurrentIndex((prev) => prev + 1)
  }, [pathname])

  useEffect(() => {
    updateNavigationState()
  }, [updateNavigationState])

  const chevronCN = "size-6 stroke-1"

  const handleBack = () => {
    if (canGoBack) {
      setCurrentIndex((prev) => prev - 1)
      router.back()
    }
  }

  const handleForward = () => {
    if (canGoForward) {
      setCurrentIndex((prev) => prev + 1)
      router.forward()
    }
  }

  return (
    <>
      <div className="flex items-center justify-start gap-x-2">
        <BFButton onClick={handleBack} disabled={!canGoBack}>
          <ChevronLeft className={cn(chevronCN)} />
        </BFButton>
        <BFButton onClick={handleForward} disabled={!canGoForward}>
          <ChevronRight className={cn(chevronCN)} />
        </BFButton>
      </div>
    </>
  )
}

type BFButtonProps = PropsWithChildren & {
  onClick: () => void
  disabled: boolean
}

export const BFButton: React.FC<BFButtonProps> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={cn(
        "flex select-none items-center justify-center rounded-full bg-muted/20 p-1 text-muted-foreground shadow-sm transition-all duration-200 ease-out",
        !disabled &&
          "hover:cursor-pointer hover:text-primary active:scale-[.98]",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      {children}
    </div>
  )
}
