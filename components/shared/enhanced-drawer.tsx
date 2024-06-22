"use client"

import React, { useState } from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "../ui/drawer"

type DrawerProps = {
  asChild?: boolean
  isOpen?: boolean
  title?: string
  drawerHeight?: string
  className?: string
  onOpenChange?: (open: boolean) => void
  shouldScaleBackground?: boolean
  isContentOverflow?: boolean
  nested?: boolean
}

type EnhancedDrawerProps = DrawerProps & {
  children?: React.ReactNode
}

export const EnhancedDrawer: React.FC<
  EnhancedDrawerProps & React.ComponentProps<typeof DrawerPrimitive.Root>
> = ({
  children,
  isOpen,
  onOpenChange,
  shouldScaleBackground = true,
  nested,
  ...props
}) => {
  const [snap, setSnap] = useState<number | string | null>("500px")

  if (nested) {
    return (
      <DrawerPrimitive.NestedRoot
        open={isOpen}
        onOpenChange={onOpenChange}
        {...props}
      >
        {children}
      </DrawerPrimitive.NestedRoot>
    )
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={onOpenChange}
      shouldScaleBackground={shouldScaleBackground}
      {...props}
    >
      {children}
    </Drawer>
  )
}

export const EnhancedDrawerTrigger: React.FC<EnhancedDrawerProps> = ({
  asChild,
  children,
  className,
  nested,
  ...props
}) => {
  return (
    <DrawerTrigger asChild={asChild} {...props}>
      {children}
    </DrawerTrigger>
  )
}
export const EnhancedDrawerContent: React.FC<EnhancedDrawerProps> = ({
  children,
  className,
  drawerHeight,
  isContentOverflow = true,
  ...props
}) => {
  return (
    <DrawerContent className={cn(className, drawerHeight)} {...props}>
      {isContentOverflow ? (
        <>
          <div className="no-scrollbar flex-1 overflow-y-auto">{children}</div>
        </>
      ) : (
        <div className="flex-1">{children}</div>
      )}
    </DrawerContent>
  )
}

export const EnhancedDrawerClose: React.FC<EnhancedDrawerProps> = ({
  children,
  title,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "sticky inset-x-0 z-50 flex h-14 items-center justify-center text-lg font-medium",
        className
      )}
      {...props}
    >
      <span className="max-w-sm truncate px-5 text-center max-sm:max-w-72">
        {title}
      </span>

      <DrawerClose
        asChild
        className="absolute right-0 top-1/2 -translate-y-1/2 text-lg"
      >
        <button className="mr-4 w-min text-blue-500">Done</button>
      </DrawerClose>
    </div>
  )
}
