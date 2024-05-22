"use client"

import React from "react"
import { Upload } from "lucide-react"

import { cn } from "@/lib/utils"
import useSubmitApp from "@/hooks/use-submit-app"
import { Button, ButtonProps } from "@/components/ui/button"

type AppSubmitButtonProps = ButtonProps & {
  children?: React.ReactNode

  className?: string
}

export const AppSubmitButton: React.FC<AppSubmitButtonProps> = ({
  children,
  className,
  variant = "default",
  size = "sm",
}) => {
  const { handleAppSubmitButtonClick } = useSubmitApp()

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleAppSubmitButtonClick}
        className={cn("w-28 text-sm", className)}
      >
        {children ? (
          children
        ) : (
          <div className="flex items-center gap-x-2">
            <span className="hidden sm:flex">New App</span>
            <Upload className="size-4" />
          </div>
        )}
      </Button>
    </>
  )
}
