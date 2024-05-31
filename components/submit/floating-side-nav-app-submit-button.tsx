import { Upload } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { AppSubmitButton } from "./app-submit-button"

const FloatingSideNavAppSubmitButton = ({
  className,
}: {
  className?: string
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <AppSubmitButton
            className={className}
            variant={"ghost"}
            size={"icon"}
          >
            <Upload />
          </AppSubmitButton>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="flex items-center gap-2 dark:bg-foreground dark:text-background"
        >
          Submit Apps
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default FloatingSideNavAppSubmitButton
