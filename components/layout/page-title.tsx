import Balancer from "react-wrap-balancer"

import { cn } from "@/lib/utils"

interface PageTitleProps {
  title: string
  subtitle?: string
  className?: string
}

export const PageTitle = ({
  title,
  subtitle,
  className,
  ...rest
}: PageTitleProps) => {
  return (
    <div className={cn("", className)}>
      <Balancer as="h1" {...rest}>
        {title}
      </Balancer>
      {subtitle}
    </div>
  )
}
