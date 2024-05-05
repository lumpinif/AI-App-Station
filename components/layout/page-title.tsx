import Link from "next/link"

import { cn } from "@/lib/utils"

import AccountModalTrigger from "../auth/auth-modal/account-modal-trigger"

interface PageTitleProps {
  title: string
  subtitle?: string
  className?: string
  href?: string
  isBorder?: boolean
  isWithAccountModalTrigger?: boolean
}

export const PageTitle = ({
  title,
  subtitle,
  className,
  href,
  isBorder = true,
  isWithAccountModalTrigger = false,
  ...rest
}: PageTitleProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-end justify-between pb-2",
        isBorder ? "border-b" : ""
      )}
    >
      <div className={cn("text-4xl", className)}>
        {href ? (
          <Link href={href}>
            <div className="flex items-baseline gap-2">
              <span className="font-bold tracking-[-.016em] md:tracking-[-.024em]">
                {title}
              </span>
              {subtitle && (
                <span className="text-muted-foreground text-base font-semibold tracking-[-.016em] md:tracking-[-.024em]">
                  {subtitle}
                </span>
              )}
            </div>
          </Link>
        ) : (
          <>
            <div className="flex flex-col">
              {subtitle && (
                <span className="text-muted-foreground mt-2 text-sm font-medium">
                  {subtitle}
                </span>
              )}
              <span className="font-bold tracking-[-.016em] md:tracking-[-.024em]">
                {title}
              </span>
            </div>
          </>
        )}
      </div>
      {isWithAccountModalTrigger && (
        <div className="sm:hidden">
          <AccountModalTrigger />
        </div>
      )}
    </div>
  )
}
