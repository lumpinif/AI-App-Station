"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function DirectThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full dark:hover:bg-foreground/10"
    >
      <Sun className="h-[1.5rem] w-[1.3rem] stroke-[1.5px] dark:hidden" />
      <Moon className="hidden h-5 w-5 stroke-[1.5px] dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
