import Link from "next/link"

import { UserLayoutRouteItemProps } from "@/config/routes/user-layout-routes"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type UserPagesNavLinksCardProps = {
  className?: string
  itemIndex: number
  link: UserLayoutRouteItemProps
  titleClassName?: string
  iconClassName?: string
  onClick?: () => void
}

export const UserPagesNavLinksCard: React.FC<UserPagesNavLinksCardProps> = ({
  link,
  className,
  itemIndex,
  titleClassName,
  iconClassName,
  onClick,
}) => {
  return (
    <Link
      key={itemIndex}
      href={link.href}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "text-muted-foreground mx-2 justify-start text-nowrap text-start font-normal transition-all duration-150 ease-out active:scale-[.98]",
        className
      )}
      onClick={onClick}
    >
      <link.icon
        className={cn("mr-2 stroke-[1.5px] md:size-6", iconClassName)}
      />
      <span className={cn("font-normal", titleClassName)}>{link.title}</span>
      {link.label && (
        <span className={cn("text-muted-foreground ml-auto font-normal")}>
          {link.label}
        </span>
      )}
    </Link>
  )
}
