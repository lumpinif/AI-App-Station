"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function DirectThemeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn("rounded-full dark:hover:bg-foreground/10", className)}
    >
      <Sun className="h-6 w-6 stroke-[1.5px] dark:hidden" />
      <Moon className="hidden h-6 w-6 stroke-[1.5px] dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
