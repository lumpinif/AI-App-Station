"use client"

import { useState } from "react"
import { Info } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ResponsiveContentModal from "@/components/shared/responsive-content-modal"

type InfoModalProps = {
  children?: React.ReactNode
  className?: string
  iconClassName?: string
}

export const InfoPopover: React.FC<InfoModalProps> = ({
  className,
  children,
  iconClassName,
}) => {
  const [showInfo, setShowInfo] = useState(false)
  return (
    <Popover modal={true} open={showInfo} onOpenChange={setShowInfo}>
      <PopoverTrigger asChild>
        <button>
          <Info
            className={cn(
              "text-muted-foreground sm:hover:text-primary size-4 transition-colors duration-200 ease-out",
              iconClassName
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent align="center" sideOffset={10}>
        <div className={cn("text-sm", className)}>{children}</div>
      </PopoverContent>
    </Popover>
  )
}
