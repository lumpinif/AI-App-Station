import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import useSearchDialog from "@/hooks/use-search-dialog-store"

import { Button } from "../ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

export default function SearchDialogTrigger({
  className,
}: {
  className?: string
}) {
  const OpenSearchDialog = useSearchDialog((state) => state.OpenSearchDialog)

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            className={cn("hover:bg-foreground/10", className)}
            onClick={OpenSearchDialog}
            variant={"ghost"}
            size={"icon"}
          >
            <Search className="" />
          </Button>
        </TooltipTrigger>

        <TooltipContent
          side="right"
          className="flex items-center gap-2 dark:bg-foreground dark:text-background"
        >
          Search
          <kbd className="pointer-events-none right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 dark:bg-muted-foreground/60 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
