"use client"

import { useRef, useState } from "react"
import {
  Bookmark,
  FileText,
  Heart,
  ListTodo,
  LucideIcon,
  Search,
  Settings,
  Upload,
} from "lucide-react"
import { ImperativePanelHandle } from "react-resizable-panels"

import { cn } from "@/lib/utils"
import useMediaQuery from "@/hooks/use-media-query"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { TooltipProvider } from "@/components/ui/tooltip"

import { ResizeableSideNav } from "./resizeable-side-nav"

type ResizeableSideBarProps = {
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
  children?: React.ReactNode
}

const links: {
  group: string
  items: {
    title: string
    label?: string
    href: string
    icon: LucideIcon
  }[]
}[] = [
  {
    group: "General",
    items: [
      // {
      //   title: "Dashboard",
      //   href: "/dashboard",
      //   label: "",
      //   icon: LayoutDashboard,
      // },
      {
        title: "Search",
        href: "/search",
        label: "",
        icon: Search,
      },
      {
        title: "Settings",
        href: "/user/settings",
        label: "",
        icon: Settings,
      },
    ],
  },
  {
    group: "User",
    items: [
      {
        title: "Apps submitted",
        href: "/user/apps",
        label: "",
        icon: ListTodo,
      },
      {
        title: "Favorites",
        href: "/user/liked",
        label: "",
        icon: Heart,
      },
      {
        title: "Bookmarks",
        href: "/user/bookmarks",
        label: "",
        icon: Bookmark,
      },
      {
        title: "Posts",
        href: "/user/posts",
        label: "",
        icon: FileText,
      },
    ],
  },
]

export const ResizeableSideBar: React.FC<ResizeableSideBarProps> = ({
  children,
  defaultLayout = [15, 85],
  defaultCollapsed = false,
  navCollapsedSize = 5,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  const leftPanelRef = useRef<ImperativePanelHandle>(null)
  const { isTablet, isDesktop } = useMediaQuery()
  const mdMinSize = 25
  const mdMaxSize = 30
  const lgMinSize = 15
  const lgMaxSize = 20

  const minSize = isDesktop ? lgMinSize : isTablet ? mdMinSize : 15
  const maxSize = isDesktop ? lgMaxSize : isTablet ? mdMaxSize : 25

  const handleResizeHandleClick = () => {
    if (leftPanelRef?.current) {
      if (leftPanelRef?.current.isCollapsed()) {
        leftPanelRef?.current.expand()
      }
      // else {
      //   leftPanelRef?.current.collapse()
      // }
    }
  }

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        id="group"
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`
        }}
        className="items-stretch"
      >
        <ResizablePanel
          ref={leftPanelRef}
          id="left-panel"
          defaultSize={defaultLayout[0]}
          minSize={minSize}
          maxSize={maxSize}
          collapsible={true}
          collapsedSize={navCollapsedSize}
          onCollapse={() => {
            setIsCollapsed(true)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
          }}
          onExpand={() => {
            setIsCollapsed(false)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
          }}
          className={cn(
            "hidden flex-col items-center justify-center transition-all  duration-150 ease-in-out md:flex",
            isCollapsed && `min-w-[50px]`
          )}
        >
          <div className="flex h-full w-full flex-col border-r">
            {/* NAV */}
            <ResizeableSideNav
              isCollapsed={isCollapsed}
              links={links}
              handleResizeHandleClick={handleResizeHandleClick}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle
          id="resize-handle"
          withHandle
          onClick={handleResizeHandleClick}
          hitAreaMargins={{ coarse: 15, fine: 5 }}
          className={cn(
            "hidden bg-transparent outline-none transition-all duration-150 ease-in-out md:flex"
          )}
        />
        <ResizablePanel id="right-panel" defaultSize={75}>
          <ScrollArea className="h-[calc(100svh-6rem)] w-full">
            {children}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
