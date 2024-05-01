"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

import { Icons } from "../icons/icons"

type BackButtonProps = {
  className?: string
  back_url?: string
}
function BackButton({ className, back_url }: BackButtonProps) {
  const route = useRouter()

  const handleOnClick = () => {
    if (back_url) {
      route.push(back_url)
    }
    route.back()
  }

  return (
    <button
      className={cn(
        "group/back bg-background ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full text-sm font-medium transition-all duration-200 hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:hover:w-24",
        className
      )}
      onClick={handleOnClick}
      type="button"
    >
      <div className="whitespace-nowrap opacity-0 group-hover/back:translate-x-3 sm:group-hover/back:opacity-100">
        Back
      </div>
      <div className="absolute left-[12px]">
        <Icons.left className="h-4 w-4" />
      </div>
    </button>
  )
}

export default BackButton
