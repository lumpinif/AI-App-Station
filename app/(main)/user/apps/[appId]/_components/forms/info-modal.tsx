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
}

export const InfoPopover: React.FC<InfoModalProps> = ({
  className,
  children,
}) => {
  const [showInfo, setShowInfo] = useState(false)
  return (
    <Popover modal={true} open={showInfo} onOpenChange={setShowInfo}>
      <PopoverTrigger asChild>
        <button>
          <Info
            className={cn(
              "size-4 text-muted-foreground transition-colors duration-200 ease-out sm:hover:text-primary"
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={10}>
        <div className={cn("text-sm", className)}>{children}</div>
      </PopoverContent>
    </Popover>
  )
}
