import { Fullscreen, Menu, PanelLeftOpen, PanelsTopLeft } from "lucide-react"

import { iosTransition } from "@/config/animations/ios-transition"
import { cn } from "@/lib/utils"
import useSideMenu from "@/hooks/use-side-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const CollapsedToggler: React.FC = () => {
  const setFullyCollapsed = useSideMenu((state) => state.setFullyCollapsed)
  const isFullyCollapsed = useSideMenu((state) => state.isFullyCollapsed)

  const handleMouseEnter = () => {
    setFullyCollapsed(false)
  }

  return (
    <div
      className={cn(
        "hidden opacity-10 md:flex",
        isFullyCollapsed && "opacity-100",
        iosTransition
      )}
      onMouseEnter={handleMouseEnter}
    >
      <Menu
        className={cn(
          "size-8 stroke-[1.5] text-muted-foreground hover:cursor-pointer hover:text-primary",
          iosTransition
        )}
      />
    </div>
  )
}

export const ExpandedToggler: React.FC = () => {
  const togglePin = useSideMenu((state) => state.togglePin)

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div onClick={togglePin}>
            <PanelLeftOpen
              className={cn(
                "size-8 stroke-[1.5] text-muted-foreground hover:cursor-pointer hover:text-primary",
                iosTransition
              )}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent
          align="start"
          className="tooltip-content flex-col !items-start gap-1"
        >
          <p>Lock menu open</p>
          <kbd className="kbd w-fit">
            <span>⌘</span>
            <span>+</span>
            <span>/</span>
          </kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const PinnedToggler: React.FC = () => {
  const togglePin = useSideMenu((state) => state.togglePin)

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div onClick={togglePin}>
            <Fullscreen
              className={cn(
                "size-8 stroke-[1.5] text-muted-foreground hover:cursor-pointer hover:text-primary",
                iosTransition
              )}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent className="tooltip-content flex-col !items-start gap-1">
          <p>Expand Screen</p>
          <kbd className="kbd w-fit">
            <span>⌘</span>
            <span>+</span>
            <span>/</span>
          </kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const SideMenuToggler: React.FC = () => {
  const isPinned = useSideMenu((state) => state.isPinned)
  const isFullyCollapsed = useSideMenu((state) => state.isFullyCollapsed)

  if (isPinned) return null

  return isFullyCollapsed ? <CollapsedToggler /> : <ExpandedToggler />
}
