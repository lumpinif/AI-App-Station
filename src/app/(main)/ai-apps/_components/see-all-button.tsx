import Link from "next/link"

import { cn } from "@/lib/utils"

type SeeAllButtonProps = {
  href: string
  className?: string
  buttonTitle?: string
}

export const SeeAllButton: React.FC<SeeAllButtonProps> = ({
  href,
  className,
  buttonTitle,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "w-fit text-blue-600 transition-all duration-300 ease-out hover:text-blue-500 active:text-blue-500",
        className
      )}
    >
      {buttonTitle ? buttonTitle : "See All"}
    </Link>
  )
}
