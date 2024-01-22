"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { RadioIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useKeyPress } from "@/hooks/use-key-press"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

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
      // router.push("/")
      console.log("keypressed Digit1")
    } else if (event.code === "Digit2") {
      // router.push("/writing")
      console.log("keypressed Digit2")
    } else if (event.code === "Digit3") {
      // router.push("/journey")
      console.log("keypressed Digit3")
    } else if (event.code === "Digit4") {
      // router.push("/stack")
      console.log("keypressed Digit4")
    } else if (event.code === "Digit5") {
      // router.push("/workspace")
      console.log("keypressed Digit5")
    } else if (event.code === "Digit6") {
      // router.push("/bookmarks")
      console.log("keypressed Digit6")
    }
  }

  const isWritingHref = href === "/writing"
  const isBookmarksHref = href === "/bookmarks"

  return (
    <ScrollArea
      className={cn(
        "hidden bg-muted lg:flex lg:flex-col",
        isInner ? "lg:w-80 xl:w-96" : "lg:w-48 xl:w-60",
        className
      )}
    >
      {title && (
        <div className="glass-card-background sticky top-0 z-10 border-b px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold tracking-tight">
              {href ? <Link href={href}>{title}</Link> : <span>{title}</span>}
            </div>
            {(isWritingHref || isBookmarksHref) && (
              <Button variant="outline" size="icon" asChild>
                <Link
                  href={isWritingHref ? "/writing.xml" : "/bookmarks.xml"}
                  title="RSS feed"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RadioIcon size={16} className="mr-2" />
                  RSS feed
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
      <div className="glass-card-background w-full rounded-3xl border p-3 bg-blend-luminosity  backdrop-blur-[100px] transition-all duration-500 ease-in-out hover:opacity-100 dark:border-none dark:shadow-outline">
        {children}
      </div>
    </ScrollArea>
  )
}
