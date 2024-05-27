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
  triggerCN,
  sideOffset,
  withTooltip = true,
  isCollapsed = true,
}: {
  children?: React.ReactNode
  className?: string
  triggerCN?: string
  iconClassName?: string
  withTooltip?: boolean
  sideOffset?: number
  isCollapsed?: boolean
}) {
  const OpenSearchDialog = useSearchDialogStore(
    (state) => state.openSearchDialog
  )

  const triggerNotCollapsedCN = cn(
    triggerCN,
    buttonVariants({
      variant: "ghost",
      size: "sm",
      className:
        "justify-start text-muted-foreground mx-2 text-nowrap font-normal",
    })
  )

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger
          onClick={OpenSearchDialog}
          className={cn(
            isCollapsed ? triggerCN : triggerNotCollapsedCN,
            "transition-all duration-150 ease-out active:scale-[.98]"
          )}
        >
          <>
            {children ? (
              children
            ) : !isCollapsed ? (
              <>
                <Search className="mr-2 stroke-[1.5px] md:size-6" />
                <span className="font-normal">Search</span>
              </>
            ) : (
              <span
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  className
                )}
                onClick={OpenSearchDialog}
              >
                <Search className={cn("stroke-[1.5px]", iconClassName)} />
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
