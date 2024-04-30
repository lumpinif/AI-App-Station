"use client"

import { PropsWithChildren, useState } from "react"
import {
  LuBarChart4,
  LuBuilding2,
  LuGalleryVertical,
  LuInbox,
  LuSettings,
  LuUsers,
} from "react-icons/lu"
import { TbChevronLeft, TbDirection } from "react-icons/tb"

type SidebarItemProps = {
  isCollapsed: boolean
  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
  className?: string
}

export const SidebarItem = ({
  children,
  leftSlot,
  rightSlot,
  isCollapsed,
  className = "",
}: PropsWithChildren<SidebarItemProps>) => {
  return (
    <div className={[`flex items-center gap-2`, className].join(" ")}>
      <div className="size-[16px] shrink-0">{leftSlot}</div>
      <div
        className={[
          "flex-1 flex justify-between items-center gap-2 overflow-hidden",
          isCollapsed ? "w-0" : "w-auto",
        ].join(" ")}
      >
        <div>{children}</div>
        <div>{rightSlot}</div>
      </div>
    </div>
  )
}

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={[
        `px-4 py-6 transition-all duration-300`,
        isCollapsed ? "w-[66px]" : "w-[240px]",
      ].join(" ")}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col">
          <SidebarItem
            isCollapsed={isCollapsed}
            className="shadow-outline rounded-md px-2 py-1"
            // leftSlot={
            //   <img
            //     alt="any"
            //     className="size-4 rounded-md"
            //     src={`https://logo.clearbit.com/linear.app?format=png`}
            //   />
            // }
            rightSlot={<TbDirection className="text-xl opacity-50" />}
          >
            <span className="text-sm font-medium">User</span>
          </SidebarItem>
          <div className="flex justify-end">
            <button
              onClick={() => setIsCollapsed((s) => !s)}
              className={[
                "size-5 flex justify-center items-center text-sm shadow-md bg-muted rounded-full dark:glass-card-background backdrop-blur-sm dark:shadow-outline text-primary translate-x-[27px]",
                "transition-all duration-300 delay-200",
                isCollapsed ? "rotate-180" : "",
              ].join(" ")}
            >
              <TbChevronLeft />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <SidebarItem
              isCollapsed={isCollapsed}
              className="glass-card-background shadow-outline rounded-md px-2 py-1"
              leftSlot={<LuBarChart4 />}
            >
              <span className="text-sm font-medium">Liked Apps</span>
            </SidebarItem>
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-2 py-1 opacity-70"
              leftSlot={
                <div className="relative">
                  <div
                    className={[
                      "size-[8px] bg-green-600 rounded-full right-0 top-0 absolute",
                      "transition-all duration-200 delay-300",
                      isCollapsed ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  ></div>
                  <LuInbox />
                </div>
              }
              rightSlot={
                <div className="bg-muted size-[16px] rounded-md text-center text-[10px]">
                  6
                </div>
              }
            >
              <span className="text-sm font-medium">Collections</span>
            </SidebarItem>
          </div>
          <div className="py-4">
            <hr />
          </div>
          <div className="flex flex-col gap-2">
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-2 py-1 opacity-70"
              leftSlot={<LuBuilding2 />}
            >
              <span className="text-sm font-medium">Companies</span>
            </SidebarItem>
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-2 py-1 opacity-70"
              leftSlot={<LuGalleryVertical />}
            >
              <span className="text-sm font-medium">Jobs</span>
            </SidebarItem>
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-2 py-1 opacity-70"
              leftSlot={<LuUsers />}
            >
              <span className="text-sm font-medium">Applications</span>
            </SidebarItem>
          </div>
        </div>
        <SidebarItem
          isCollapsed={isCollapsed}
          className="px-2 py-1 opacity-70"
          leftSlot={<LuSettings />}
        >
          <span className="text-sm font-medium">Settings</span>
        </SidebarItem>
      </div>
    </aside>
  )
}
