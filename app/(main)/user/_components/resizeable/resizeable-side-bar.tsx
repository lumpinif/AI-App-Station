"use client"

import { useRef, useState } from "react"
import { ImperativePanelHandle } from "react-resizable-panels"

import { userLayoutRoutes } from "@/config/user-layout-routes"
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
            "peer hidden flex-col items-center justify-center transition-all duration-150 ease-in-out md:flex",
            isCollapsed && `min-w-[50px]`
          )}
        >
          <div className="flex h-full w-full flex-col border-r">
            {/* NAV */}
            <ResizeableSideNav
              isCollapsed={isCollapsed}
              links={userLayoutRoutes}
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
            "bg-transparent opacity-0 outline-none transition-all duration-150 ease-in-out focus-within:opacity-100 hover:opacity-100  focus:opacity-100 peer-hover:opacity-100 peer-active:opacity-100 md:focus-within:opacity-100 md:focus:opacity-100 md:peer-hover:opacity-100 md:peer-active:opacity-100"
          )}
        />
        <ResizablePanel id="right-panel" defaultSize={75}>
          <ScrollArea className="h-[calc(100svh-6rem)] w-full p-1">
            {children}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
