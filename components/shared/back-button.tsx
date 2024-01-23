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
    // <Link
    //   href={href}
    //   className={cn(
    //     buttonVariants({ variant: "ghost" }),
    //     "rounded-full",
    //     className
    //   )}
    // >
    //   <div className="flex items-center justify-center">
    //     <Icons.left className="h-4 w-4" />
    //     <span className="hidden sm:block">Back</span>
    //   </div>
    // </Link>
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full font-medium  transition-all duration-300 hover:w-24",
        className
      )}
    >
      <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:translate-x-3 group-hover:opacity-100">
        Back
      </div>
      <div className="absolute left-[12px]">
        <Icons.left className="h-4 w-4" />
      </div>
    </Link>
  )
}

export default BackButton
