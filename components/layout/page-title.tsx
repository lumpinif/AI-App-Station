import Link from "next/link"

import { cn } from "@/lib/utils"

import AccountModalTrigger from "../auth/auth-modal/account-modal-trigger"

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
    <div className="flex w-full items-end justify-between border-b pb-2">
      <div className={cn("text-4xl", className)}>
        {href ? (
          <Link href={href} className="inline-block">
            <div className="flex flex-col">
              {subtitle && (
                <span className="mb-2 text-sm font-medium uppercase text-muted-foreground">
                  {subtitle}
                </span>
              )}
              <span className="font-bold tracking-[-.016em] md:leading-[48px] md:tracking-[-.024em]">
                {title}
              </span>
            </div>
          </Link>
        ) : (
          <>
            <div className="flex flex-col">
              {subtitle && (
                <span className="mt-2 text-sm font-medium uppercase text-muted-foreground">
                  {subtitle}
                </span>
              )}
              <span className="font-bold tracking-[-.016em] md:leading-[48px] md:tracking-[-.024em]">
                {title}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="sm:hidden">
        <AccountModalTrigger />
      </div>
    </div>
  )
}
