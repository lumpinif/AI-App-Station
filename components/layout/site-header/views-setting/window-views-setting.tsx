import { Fullscreen, PanelLeftClose, PanelLeftOpen } from "lucide-react"

import useSideMenu from "@/hooks/use-side-menu"
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"

import { iconCN, menuContentCN, menuItemCN } from "../page-settings"

type WindowViewsSettingProps = {}

export const WindowViewsSetting: React.FC<WindowViewsSettingProps> = ({}) => {
  const isPinned = useSideMenu((state) => state.isPinned)
  const closeMenu = useSideMenu((state) => state.closeMenu)
  const unpinMenu = useSideMenu((state) => state.unpinMenu)
  const pinMenu = useSideMenu((state) => state.pinMenu)
  const setFullyCollapsed = useSideMenu((state) => state.setFullyCollapsed)
  const isFullyCollapsed = useSideMenu((state) => state.isFullyCollapsed)

  const handleFullyCollapsed = () => {
    unpinMenu()
    closeMenu()
    setFullyCollapsed(true)
  }

  const handleUnlock = () => {
    unpinMenu()
    closeMenu()
  }

  return (
    <>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className={menuItemCN}>
          Window views
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent sideOffset={10} className={menuContentCN}>
            <DropdownMenuItem
              disabled={isFullyCollapsed}
              className={menuItemCN}
              onClick={() => handleFullyCollapsed()}
            >
              Expand full screen
              <Fullscreen className={iconCN} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              disabled={!isPinned}
              className={menuItemCN}
              onClick={() => handleUnlock()}
            >
              Unlock side menu
              <PanelLeftClose className={iconCN} />
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={isPinned}
              className={menuItemCN}
              onClick={() => pinMenu()}
            >
              Lock side menu open
              <PanelLeftOpen className={iconCN} />
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </>
  )
}
