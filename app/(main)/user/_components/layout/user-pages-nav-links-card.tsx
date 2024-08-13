import Link from "next/link"

import { NavItemProps } from "@/config/routes/site-routes"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type UserPagesNavLinksCardProps = {
  className?: string
  itemIndex: number
  titleClassName?: string
  iconClassName?: string
  onClick?: () => void
  link: NavItemProps
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
        "mx-2 justify-start text-nowrap text-start font-normal text-muted-foreground transition-all duration-150 ease-out active:scale-[.98]",
        className
      )}
      onClick={onClick}
    >
      {link.icon && (
        <link.icon
          className={cn("mr-2 stroke-[1.5px] md:size-6", iconClassName)}
        />
      )}
      <span className={cn("font-normal", titleClassName)}>{link.title}</span>
      {link.label && (
        <span className={cn("ml-auto font-normal text-muted-foreground")}>
          {link.label}
        </span>
      )}
    </Link>
  )
}
