import { Settings2 } from "lucide-react"

import { iosTransition } from "@/config/animations/ios-transition"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ThemeModeSetting } from "./views-setting/theme-mode-setting"
import { WindowViewsSetting } from "./views-setting/window-views-setting"

export const menuItemCN = cn(
  "text-muted-foreground hover:text-primary cursor-pointer active:scale-[.98] flex items-center justify-between gap-x-4",
  iosTransition
)
export const menuContentCN = "border dark:border-none dark:shadow-outline"
export const iconCN = "size-4 stroke-1 text-muted-foreground"

export const PageSettings: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Settings2
          className={cn(
            "size-6 cursor-pointer text-muted-foreground hover:text-foreground",
            iosTransition
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={menuContentCN}>
        <WindowViewsSetting />
        <ThemeModeSetting />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
