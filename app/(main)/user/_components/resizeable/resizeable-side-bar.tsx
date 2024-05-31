"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ImperativePanelHandle } from "react-resizable-panels"

import { cn } from "@/lib/utils"
import useMediaQuery from "@/hooks/use-media-query"
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { TooltipProvider } from "@/components/ui/tooltip"

import { ResizeableSideBarHandle } from "./resizeable-side-bar-handle"
import { ResizeableSideNav } from "./resizeable-side-nav"

type ResizeableSideBarProps = {
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
  children?: React.ReactNode
}

export const ResizeableSideBar: React.FC<ResizeableSideBarProps> = ({
  children,
  defaultLayout,
  defaultCollapsed = false,
  navCollapsedSize = 5,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  const { isTablet, isDesktop } = useMediaQuery()
  const leftPanelRef = useRef<ImperativePanelHandle>(null)

  const mdMinSize = 20
  const mdMaxSize = 26
  const lgMinSize = 12
  const lgMaxSize = 20

  const minSize = isDesktop ? lgMinSize : isTablet ? mdMinSize : 15
  const maxSize = isDesktop ? lgMaxSize : isTablet ? mdMaxSize : 26

  if (!defaultLayout) {
    defaultLayout = [minSize, 100 - minSize]
  }

  const isLeftPanelCollapsed = leftPanelRef?.current?.isCollapsed()

  const handleResizeHandleClick = useCallback(() => {
    if (leftPanelRef?.current) {
      if (isLeftPanelCollapsed) {
        leftPanelRef?.current.expand()
      } else {
        leftPanelRef?.current.collapse()
      }
    }
  }, [isLeftPanelCollapsed])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === " " && (e.metaKey || e.ctrlKey)) {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }
        e.preventDefault()
        handleResizeHandleClick()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [handleResizeHandleClick, isLeftPanelCollapsed])

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
            "peer hidden flex-col items-center justify-center border-r border-border/30 transition-all duration-150 ease-in-out dark:border-border/10 md:flex",
            isCollapsed ? `min-w-[50px]` : ""
          )}
        >
          {/* NAV */}
          <ResizeableSideNav
            isCollapsed={isCollapsed}
            handleResizeHandleClick={handleResizeHandleClick}
          />
        </ResizablePanel>

        {/* Resize handle */}

        <ResizeableSideBarHandle
          handleResizeHandleClick={handleResizeHandleClick}
        />

        <ResizablePanel id="right-panel" defaultSize={defaultLayout[1]}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
