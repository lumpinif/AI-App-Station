import { useState } from "react"
import { Info } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ResponsiveContentModal from "@/components/shared/responsive-content-modal"

type InfoModalProps = {
  children?: React.ReactNode
  className?: string
  infoTitle?: string
  tooltipContent?: string
  dialogContentClassName?: string
  drawerContentClassName?: string
  drawerHeight?: string
}

export const InfoModal: React.FC<InfoModalProps> = ({
  className,
  children,
  infoTitle,
  drawerHeight,
  dialogContentClassName,
  drawerContentClassName,
  tooltipContent,
}) => {
  const [showInfo, setShowInfo] = useState(false)
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button onClick={() => setShowInfo(true)}>
          <Info
            className={cn(
              "size-4 text-muted-foreground transition-colors duration-200 ease-out sm:hover:text-primary",
              className
            )}
          />
        </button>
      </TooltipTrigger>
      <TooltipContent
        className="flex items-center text-xs dark:bg-foreground dark:text-background"
        align="center"
        side="right"
      >
        {tooltipContent}
      </TooltipContent>
      <ResponsiveContentModal
        dialogContentClassName={dialogContentClassName}
        drawerContentClassName={drawerContentClassName}
        drawerHeight={drawerHeight}
        isOpen={showInfo}
        onChange={(open: boolean) => {
          if (!open) setShowInfo(false)
        }}
        title={infoTitle}
      >
        <div className="">{children}</div>
      </ResponsiveContentModal>
    </Tooltip>
  )
}
