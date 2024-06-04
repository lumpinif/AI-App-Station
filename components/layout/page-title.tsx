import Link from "next/link"

import { cn } from "@/lib/utils"

import AccountModalTrigger from "../auth/auth-modal/account-modal-trigger"
import BackButton from "../shared/back-button"

interface PageTitleProps {
  href?: string
  title: string
  subtitle?: string
  className?: string
  withBorder?: boolean
  backButtonCN?: string
  withBackButton?: boolean
  children?: React.ReactNode
  WithAccountModalTrigger?: boolean
}

export const PageTitle = ({
  href,
  title,
  children,
  subtitle,
  className,
  backButtonCN,
  withBackButton = false,
  withBorder: isBorder = true,
  WithAccountModalTrigger = false,
}: PageTitleProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-end justify-between pb-0",
        isBorder ? "border-b pb-2" : ""
      )}
    >
      {withBackButton ? (
        <div className={cn("flex items-end gap-x-4", className)}>
          <BackButton className={cn(backButtonCN)} />
          <div className={cn("text-4xl")}>
            {href ? (
              <Link href={href}>
                <div className="flex items-baseline gap-2">
                  <span className="page-title-font">{title}</span>
                  {subtitle && (
                    <span className="text-base font-semibold tracking-[-.016em] text-muted-foreground md:tracking-[-.024em]">
                      {subtitle}
                    </span>
                  )}
                </div>
              </Link>
            ) : (
              <div className="flex flex-col">
                {subtitle && (
                  <span className="mt-2 text-sm font-medium text-muted-foreground">
                    {subtitle}
                  </span>
                )}
                <span className="page-title-font">{title}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={cn("text-4xl", className)}>
          {href ? (
            <Link href={href}>
              <div className="flex items-baseline gap-2">
                <span className="page-title-font">{title}</span>
                {subtitle && (
                  <span className="text-base font-semibold tracking-[-.016em] text-muted-foreground md:tracking-[-.024em]">
                    {subtitle}
                  </span>
                )}
              </div>
            </Link>
          ) : (
            <div className="flex flex-col">
              {subtitle && (
                <span className="mt-2 text-sm font-medium text-muted-foreground">
                  {subtitle}
                </span>
              )}
              <span className="page-title-font">{title}</span>
            </div>
          )}
        </div>
      )}

      {WithAccountModalTrigger ||
        (children && (
          <div
            className={cn(
              children && "flex items-center gap-x-2",
              WithAccountModalTrigger && "sm:hidden"
            )}
          >
            {children}
            {WithAccountModalTrigger && <AccountModalTrigger />}
          </div>
        ))}
    </div>
  )
}
