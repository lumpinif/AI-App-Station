import React from "react"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import useSearchDialogStore from "@/hooks/use-search-dialog-store"

import { buttonVariants } from "../ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

export default function SearchCommandDialogTrigger({
  children,
  className,
  iconClassName,
  triggerClassName,
  withTooltip = true,
  sideOffset,
}: {
  children?: React.ReactNode
  className?: string
  triggerClassName?: string
  iconClassName?: string
  withTooltip?: boolean
  sideOffset?: number
}) {
  const OpenSearchDialog = useSearchDialogStore(
    (state) => state.openSearchDialog
  )

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger
          onClick={OpenSearchDialog}
          className={cn("active:scale-[.98]", triggerClassName)}
        >
          <>
            {children ? (
              children
            ) : (
              <span
                className={cn(
                  "hover:bg-foreground/10",
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  className
                )}
                onClick={OpenSearchDialog}
              >
                <Search className={iconClassName} />
              </span>
            )}
          </>
        </TooltipTrigger>
        {withTooltip && (
          <TooltipContent
            sideOffset={sideOffset}
            side="right"
            className="dark:bg-foreground dark:text-background flex items-center gap-2"
          >
            Search
            <kbd className="bg-muted dark:bg-muted-foreground/60 pointer-events-none right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}
