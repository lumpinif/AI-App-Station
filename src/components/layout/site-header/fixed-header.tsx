import { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

type FixedHeaderProps = PropsWithChildren & {
  className?: string
}

export const FixedHeader: React.FC<FixedHeaderProps> = ({
  children,
  className,
}) => {
  return (
    <>
      <div
        className={cn(
          "sticky inset-x-0 top-0 z-50 mx-auto hidden h-14 w-full items-center overflow-hidden bg-background p-4 px-8 text-sm md:flex",
          className
        )}
      >
        {children}
      </div>
    </>
  )
}
