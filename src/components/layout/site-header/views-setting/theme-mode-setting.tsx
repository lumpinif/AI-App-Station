import { useEffect, useState } from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"

import { iconCN, menuContentCN, menuItemCN } from "../page-settings"

type ThemeModeSettingProps = {}

export const ThemeModeSetting: React.FC<ThemeModeSettingProps> = ({}) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className={menuItemCN}>
          Theme mode
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent sideOffset={10} className={menuContentCN}>
            <DropdownMenuItem
              className={cn(
                menuItemCN,
                theme === "light" && "font-medium text-primary"
              )}
              onClick={() => setTheme("light")}
            >
              Light
              <Sun
                className={cn(
                  iconCN,
                  theme === "light" && "stroke-[1.5] text-primary"
                )}
              />
            </DropdownMenuItem>

            <DropdownMenuItem
              className={cn(
                menuItemCN,
                theme === "dark" && "font-medium text-primary"
              )}
              onClick={() => setTheme("dark")}
            >
              Dark
              <Moon
                className={cn(
                  iconCN,
                  theme === "dark" && "stroke-[1.5] text-primary"
                )}
              />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className={cn(
                menuItemCN,
                theme === "system" && "font-medium text-primary"
              )}
              onClick={() => setTheme("system")}
            >
              {theme === "system" ? "Following system" : "Follow system"}
              <Monitor
                className={cn(
                  iconCN,
                  theme === "system" && "stroke-[1.5] text-primary"
                )}
              />
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </>
  )
}
