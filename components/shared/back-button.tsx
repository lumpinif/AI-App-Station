"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

import { Icons } from "../icons/icons"
import { buttonVariants } from "../ui/button"

type BackButtonProps = {
  className?: string
}
function BackButton({ className }: BackButtonProps) {
  const route = useRouter()
  return (
    <div
      className={cn(
        "group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-background text-sm font-medium ring-offset-background transition-all duration-200 hover:w-24 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={() => route.back()}
    >
      <div className="whitespace-nowrap opacity-0 group-hover:translate-x-3 group-hover:opacity-100">
        Back
      </div>
      <div className="absolute left-[12px]">
        <Icons.left className="h-4 w-4" />
      </div>
    </div>
  )
}

export default BackButton
