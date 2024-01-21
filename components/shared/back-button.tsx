import React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { Icons } from "../icons/icons"
import { buttonVariants } from "../ui/button"

type BackButtonProps = {
  href: string
  className?: string
}
function BackButton({ href, className }: BackButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "rounded-full",
        className
      )}
    >
      <div className="flex items-center justify-center">
        <Icons.left className="h-4 w-4" />
        <span className="hidden sm:block">Back</span>
      </div>
    </Link>
  )
}

export default BackButton
