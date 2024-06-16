"use client"

import { getCurrentDateFormatted } from "@/lib/utils"
import { PageTitle } from "@/components/layout/page-title"

type TodayPageTitleProps = Partial<
  React.ComponentPropsWithoutRef<typeof PageTitle>
> & {}

const TodayPageTitle = ({
  href,
  title,
  children,
  className,
  ...props
}: TodayPageTitleProps) => {
  const currentDate = getCurrentDateFormatted()
  return (
    <PageTitle
      withBorder
      date={currentDate}
      className={className}
      href={href ? href : "/today"}
      title={title ? title : "Today"}
      {...props}
    >
      {children}
    </PageTitle>
  )
}

export default TodayPageTitle
