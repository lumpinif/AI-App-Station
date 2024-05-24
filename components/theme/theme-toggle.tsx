"use client"

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
  isDropDown?: boolean
  isDirect?: boolean
  className?: string
}

export function ThemeToggle({
  isDropDown = false,
  isDirect = false,
  className,
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()

  // Use the resolved theme if available, otherwise fall back to the theme
  const currentTheme = resolvedTheme || theme

  if (isDirect) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={cn(
          "dark:hover:bg-foreground/10 rounded-full active:scale-[.98]",
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
            className=" rounded-full border-none focus:outline-none"
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

  return (
    <>
      <div className="dark:glass-card-background text-muted-foreground dark:shadow-outline flex w-fit flex-row items-center space-x-4 rounded-full p-2 transition-all duration-150 ease-out">
        <button
          type="button"
          className="text-primary  dark:text-muted-foreground"
          onClick={() => setTheme("light")}
        >
          <Sun size={18} className="stroke-[1.5px] dark:stroke-1" />
        </button>

        <button type="button" onClick={() => setTheme("system")}>
          <Monitor size={18} className="stroke-1" />
        </button>

        <button
          type="button"
          className="dark:text-primary"
          onClick={() => setTheme("dark")}
        >
          <Moon size={18} className="stroke-1 dark:stroke-[1.5px]" />
        </button>
      </div>
    </>
  )
}
