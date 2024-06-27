import { Construction } from "lucide-react"

import { cn } from "@/lib/utils"

type InDevNoticeProps = {
  title?: string
  className?: string
  iconClassName?: string
  children?: React.ReactNode
}

export const InDevNotice: React.FC<InDevNoticeProps> = ({
  title,
  children,
  className,
  iconClassName,
}) => {
  return (
    <div className={cn("page-title-font", className)}>
      <Construction className={cn("size-10 text-yellow-500", iconClassName)} />
      <span>The {title} is currently still in active development ...</span>
    </div>
  )
}
