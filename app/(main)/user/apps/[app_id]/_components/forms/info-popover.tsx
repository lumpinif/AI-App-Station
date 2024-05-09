"use client"

import React, { useState } from "react"
import { CircleHelp, Info } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type InfoModalProps = React.ComponentPropsWithoutRef<typeof PopoverContent> & {
  children?: React.ReactNode
  className?: string
  iconClassName?: string
  isQuestionIcon?: boolean
}

export const InfoPopover: React.FC<InfoModalProps> = ({
  className,
  children,
  iconClassName,
  isQuestionIcon = true,
  ...props
}) => {
  const [showInfo, setShowInfo] = useState(false)
  return (
    <Popover modal={true} open={showInfo} onOpenChange={setShowInfo}>
      <PopoverTrigger asChild>
        <button>
          {isQuestionIcon ? (
            <CircleHelp
              className={cn(
                "text-muted-foreground sm:hover:text-primary size-3 transition-colors duration-200 ease-out",
                iconClassName
              )}
            />
          ) : (
            <Info
              className={cn(
                "text-muted-foreground sm:hover:text-primary size-3 transition-colors duration-200 ease-out",
                iconClassName
              )}
            />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={15} {...props}>
        <div className={cn("text-sm", className)}>{children}</div>
      </PopoverContent>
    </Popover>
  )
}
