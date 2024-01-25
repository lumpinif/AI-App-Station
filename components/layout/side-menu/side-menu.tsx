"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { useKeyPress } from "@/hooks/use-key-press"
import { ScrollArea } from "@/components/shared/scroll-area"

type SideMenuProps = {
  children: React.ReactNode
  title?: string
  href?: string
  isInner?: boolean
  className?: string
}

export const SideMenu = ({
  children,
  title,
  href,
  isInner,
  className,
}: SideMenuProps) => {
  const router = useRouter()

  useKeyPress({
    callback: onKeyPress,
    keyCodes: ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6"],
  })

  function onKeyPress(event: KeyboardEvent) {
    event.preventDefault()

    if (event.code === "Digit1") {
      router.push("/today")
    } else if (event.code === "Digit2") {
      router.push("/ai-apps")
    } else if (event.code === "Digit3") {
      router.push("/discover")
    } else if (event.code === "Digit4") {
      router.push("/search")
    } else if (event.code === "Digit5") {
      // router.push("/workspace")
      console.log("keypressed Digit5")
    } else if (event.code === "Digit6") {
      // router.push("/bookmarks")
      console.log("keypressed Digit6")
    }
  }

  return (
    <>
      <ScrollArea
        className={cn(
          "hidden transition-all duration-200 ease-in lg:flex lg:flex-col",
          className,
          isInner ? "lg:w-48 xl:w-52" : "lg:w-48 xl:w-52"
        )}
      >
        {title && (
          <div className="sticky top-0 z-10 px-5 py-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold tracking-tight">
                {href ? <Link href={href}>{title}</Link> : <span>{title}</span>}
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-1 p-3">{children}</div>
      </ScrollArea>
    </>
  )
}
