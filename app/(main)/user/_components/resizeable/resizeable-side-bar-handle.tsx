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
      hitAreaMargins={{ coarse: 15, fine: 5 }}
      className={cn(
        "bg-transparent opacity-0 outline-none transition-all duration-150 ease-in-out focus-within:opacity-100 hover:opacity-100  focus:opacity-100 peer-hover:opacity-100 peer-active:opacity-100 md:focus-within:opacity-100 md:focus:opacity-100 md:peer-hover:opacity-100 md:peer-active:opacity-100",
        className
      )}
    />
  )
}
