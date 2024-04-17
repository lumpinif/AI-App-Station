import Link from "next/link"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

const AppSubmitButton = ({
  className,
  children,
  size = "icon",
}: {
  className?: string
  children?: React.ReactNode
  size?: "default" | "sm" | "lg" | "icon" | "xs" | null | undefined
}) => {
  const router = useRouter()

  return (
    <>
      {children ? (
        <Link className={cn("text-sm", className)} href={"/submit"}>
          {children}
        </Link>
      ) : null}
    </>
  )
}

export default AppSubmitButton
