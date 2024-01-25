import { SCROLL_AREA_ID } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface ScrollAreaProps {
  hasScrollTitle?: boolean
  className?: string
  children: React.ReactNode
}

export const ScrollArea = ({
  hasScrollTitle = false,
  className,
  children,
  ...rest
}: ScrollAreaProps) => (
  <div
    id={hasScrollTitle ? SCROLL_AREA_ID : undefined}
    className={cn("scrollable-area relative w-full", className)}
    {...rest}
  >
    {children}
  </div>
)
