import Link from "next/link"
import Balancer from "react-wrap-balancer"

import { cn } from "@/lib/utils"

interface PageTitleProps {
  title: string
  subtitle?: string
  className?: string
  href?: string
}

export const PageTitle = ({
  title,
  subtitle,
  className,
  href,
  ...rest
}: PageTitleProps) => {
  return (
    <div
      className={cn(
        "text-4xl font-bold tracking-[-.016em] md:leading-[48px] md:tracking-[-.024em]",
        className
      )}
    >
      {href ? (
        <Link href={href}>
          {title}
          {subtitle}
        </Link>
      ) : (
        <>
          {title}
          {subtitle}
        </>
      )}

      {/* <Balancer as="h1" {...rest}> */}
      {/* </Balancer> */}
    </div>
  )
}
