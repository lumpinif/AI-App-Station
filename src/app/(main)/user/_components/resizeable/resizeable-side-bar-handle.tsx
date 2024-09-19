import { cn } from "@/lib/utils"
import { ResizableHandle } from "@/components/ui/resizable"

type ResizeableSideBarHandleProps = {
  className?: string
  handleResizeHandleClick: () => void
}

export const ResizeableSideBarHandle: React.FC<
  ResizeableSideBarHandleProps
> = ({ className, handleResizeHandleClick }) => {
  return (
    <ResizableHandle
      id="resize-handle"
      withHandle
      onClick={handleResizeHandleClick}
      // hitAreaMargins={{ coarse: 10, fine: 3 }}
      className={cn(
        "w-[0.5px] bg-border opacity-0 transition-all duration-200 ease-in-out focus-within:opacity-100 hover:opacity-100 focus:opacity-100 active:opacity-100 peer-hover:opacity-100 peer-active:opacity-100 dark:bg-border/80",
        className
      )}
    />
  )
}
