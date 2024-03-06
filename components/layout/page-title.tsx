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
    <div
      className={cn(
        "text-4xl font-bold tracking-[-.016em] md:leading-[48px] md:tracking-[-.024em]",
        className
      )}
    >
      {/* <Balancer as="h1" {...rest}> */}
      {title}
      {/* </Balancer> */}
      {subtitle}
    </div>
  )
}
