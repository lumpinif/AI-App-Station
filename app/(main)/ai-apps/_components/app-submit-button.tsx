import Link from "next/link"
import { useRouter } from "next/navigation"
import { Upload } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
      <Button
        variant="ghost"
        size={size}
        onClick={() => router.push("/submit")}
        className={cn("rounded-full dark:hover:bg-foreground/10", className)}
      >
        <Upload />
        <span className="sr-only">Submit AI Apps</span>
      </Button>
    </>
  )
}

export default AppSubmitButton
