import Link from "next/link"
import { useRouter } from "next/navigation"
import { Upload } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const AppSubmitButton = ({
  className,
  children,
  size = "icon",
}: {
  className?: string
  children?: React.ReactNode
  size?: "default" | "sm" | "lg" | "icon" | "xs" | null | undefined
}) => {
  const router = useRouter()

  const handleClick = () => {
    router.push("/submit")
  }

  return (
    <>
      {children ? (
        <Link className={cn("text-sm", className)} href={"/submit"}>
          {children}
        </Link>
      ) : (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                className={className}
                variant={"ghost"}
                size={"icon"}
                onClick={handleClick}
              >
                <Upload />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="flex items-center gap-2 dark:bg-foreground dark:text-background"
            >
              Submit Apps
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  )
}

export default AppSubmitButton
