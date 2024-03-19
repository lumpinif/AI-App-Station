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
        buttonVariants({ variant: "ghost" }),
        "group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full font-medium transition-all duration-200 ease-in-out hover:w-24 hover:cursor-pointer",
        className
      )}
      onClick={() => route.back()}
    >
      <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 ease-in-out group-hover:translate-x-3 group-hover:opacity-100">
        Back
      </div>
      <div className="absolute left-[12px]">
        <Icons.left className="h-4 w-4" />
      </div>
    </div>
  )
}

export default BackButton
