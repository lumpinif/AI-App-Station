import { Construction } from "lucide-react"

import { cn } from "@/lib/utils"

type InDevNoticeProps = {
  title?: string
  className?: string
  children?: React.ReactNode
}

export const InDevNotice: React.FC<InDevNoticeProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <>
      <div className={cn("page-title-font", className)}>
        <Construction className="size-10 text-yellow-500" />
        The {title} is currently still in active development ...
      </div>
    </>
  )
}
