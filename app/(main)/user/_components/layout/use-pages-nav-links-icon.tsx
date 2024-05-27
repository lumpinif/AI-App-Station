import Link from "next/link"

import { UserLayoutRouteItemProps } from "@/config/routes/user-layout-routes"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type UserPagesNavLinksIconProps = {
  link: UserLayoutRouteItemProps
  itemIndex: number
  className?: string
}

export const UserPagesNavLinksIcon: React.FC<UserPagesNavLinksIconProps> = ({
  link,
  itemIndex,
  className,
}) => {
  return (
    <Tooltip key={itemIndex} delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={link.href}
          className={cn(
            "transition-all duration-150 ease-out active:scale-[.98]",
            buttonVariants({
              variant: "ghost",
              size: "icon",
            }),
            className
          )}
        >
          <link.icon className="stroke-[1.5px]" />
          <span className="sr-only">{link.title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        className="dark:bg-foreground dark:text-background flex items-center gap-2 text-xs"
      >
        {link.title}
        {link.label && (
          <span className="text-muted-foreground ml-auto">{link.label}</span>
        )}
      </TooltipContent>
    </Tooltip>
  )
}
