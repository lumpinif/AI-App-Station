"use client"

import React, { useEffect, useState } from "react"
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ThemeToggleProps = {
  isDirect?: boolean
  className?: string
  isDropDown?: boolean
}

function ClientSideThemeToggle({
  theme,
  setTheme,
  className,
}: {
  theme: string | undefined
  setTheme: (theme: string) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        "dark:glass-card-background flex w-fit flex-row items-center space-x-4 rounded-full p-2 text-muted-foreground transition-all duration-150 ease-out dark:shadow-outline",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={cn(
          "text-muted-foreground",
          theme === "light" ? "text-primary" : ""
        )}
      >
        <Sun
          size={18}
          className={cn("stroke-[1]", theme === "light" ? "stroke-[1.5]" : "")}
        />
      </button>

      <button
        type="button"
        onClick={() => setTheme("system")}
        className={cn(
          "text-muted-foreground",
          theme === "system" ? "text-primary" : ""
        )}
      >
        <Monitor
          size={18}
          className={cn("stroke-[1]", theme === "system" ? "stroke-[1.5]" : "")}
        />
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={cn(
          "text-muted-foreground",
          theme === "dark" ? "text-primary" : ""
        )}
      >
        <Moon
          size={18}
          className={cn("stroke-[1]", theme === "dark" ? "stroke-[1.5]" : "")}
        />
      </button>
    </div>
  )
}

export function ThemeToggle({
  className,
  isDropDown = false,
  isDirect = false,
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (isDirect) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={cn(
          "rounded-full active:scale-[.98] dark:hover:bg-foreground/10",
          className
        )}
      >
        <Sun className="h-6 w-6 stroke-[1.5px] dark:hidden" />
        <Moon className="hidden h-6 w-6 stroke-[1.5px] dark:block" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  if (isDropDown) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border-none focus:outline-none"
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all focus:outline-none dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all focus:outline-none dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <SunIcon className="mr-2" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <MoonIcon className="mr-2" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <DesktopIcon className="mr-2" />
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (!mounted) {
    return null
  }

  return (
    <ClientSideThemeToggle
      theme={theme}
      setTheme={setTheme}
      className={className}
    />
  )
}
